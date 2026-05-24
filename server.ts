import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization client getter
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(clientApiKey?: string): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY || clientApiKey;
  if (!key) {
    throw new Error("Gemini API Key is not configured. Please save a key in Settings or contact the administrator.");
  }
  if (!aiClient || clientApiKey) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Career Onboarding Analysis
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { education, interests, skills, experience, opportunities, challenges, apiKey } = req.body;
      const client = getGeminiClient(apiKey);

      const prompt = `
You are PathPilot AI, an intelligent AI-powered career navigation assistant designed to help students, graduates, and job seekers.

Please analyze the user's answers to the onboarding questions:
1. Current Education Level: ${education || "Not specified"}
2. Interested Fields/Industries: ${interests ? interests.join(", ") : "None specified"}
3. Current Skills: ${skills ? skills.join(", ") : "None specified"}
4. Prior Experience, Projects, Certifications, Volunteering: ${experience || "None/Fresher"}
5. Opportunities Looking For: ${opportunities ? opportunities.join(", ") : "None specified"}
6. Biggest Career Challenges: ${challenges ? challenges.join(", ") : "None specified"}

According to our guidelines, do NOT give generic answers. Personalize every section heavily based on user skills, education level, and goals. Make sure opportunities are realistic:
- Suggest beginner-friendly, accessible opportunities if they are a school student (Grade 8-10, Grade 11-12).
- Suggest growth-focused, skill-building opportunities if they are a college student.
- Suggest employability-focused, career-starting opportunities if they are a graduate or working professional.

Please generate a comprehensive, highly personalized strategic career assessment report containing EXACTLY these steps:

STEP 1: Profile Breakdown
Break down their skills, interests, and background strengths. Highlight transferable qualities and strengths.

STEP 2: Suggested Career Paths
Suggest 5 to 8 specific career paths or job roles they are highly eligible for.

STEP 3: Eligibility & Reason
For each suggested role, explain clearly and strategically WHY they are suitable based on their existing profile.

STEP 4: Match & Next Actions
Suggest a series of concrete internships, jobs, freelance gigs, or volunteering projects relevant to their profile.

STEP 5: Skill Gap Analysis
Identify exact skill gaps for their target path. You MUST format each target using this exact snippet configuration (be sure to include the EXACT percentage suitability format):
“You are currently [X]% qualified for this role.
To improve your chances, focus on:
- [Skill 1]
- [Skill 2]
- [Skill 3]”

STEP 6: Recommend Strategic Resources
Recommend specific certifications, practical projects, webinar topics, or real-world experiences to boost their employability.

STEP 7: Strategic Growth Guidance
Provide supportive, encouraging, and tactical guidance to maintain momentum and confidence.

Always end the response with this exact quote (do not add any words after it):
"Your future isn’t random — PathPilot helps you build it strategically."
`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ analysis: response.text || "Onboarding assessment draft could not be generated." });
    } catch (err: any) {
      console.error("Onboarding analysis backend error:", err);
      res.status(500).json({ error: err.message || "Failed to analyze onboarding answers." });
    }
  });

  // API Route: AI Career Coach Chat Proxy
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, profile, apiKey } = req.body;
      const client = getGeminiClient(apiKey);
      
      const systemInstruction = `You are PathPilot, a premium AI career coach. User profile summary: name is ${profile?.name || "User"}, type is ${profile?.userType || "Job Seeker"}, target role is "${profile?.targetRole || "SaaS Engineer"}", top skills are [${profile?.skills ? profile.skills.slice(0, 5).join(", ") : "General Engineering"}]. Answer career questions with insight, clarity, and encouragement. Be concise. Always end with: "Your future isn’t random — PathPilot helps you build it strategically." if wrapping up a strategic advice thread. Be supportive, friendly but intelligent, and strategic.`;
      
      const contents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      res.json({ reply: response.text || "I was unable to draft a clear recommendation right now." });
    } catch (err: any) {
      console.error("Chat backend error:", err);
      res.status(500).json({ error: err.message || "Failed to process chat query" });
    }
  });

  // API Route: AI Weekly Actions/Brief Proxy
  app.post("/api/gemini/brief", async (req, res) => {
    try {
      const { profile, apiKey } = req.body;
      const client = getGeminiClient(apiKey);
      
      const prompt = `You are PathPilot, an AI career advisor. User profile: ${JSON.stringify(profile, null, 0)}. Give exactly 3 sharp, specific career action items for this week. Number them. Be motivating and concrete. Keep total response under 120 words. Do not output anything else. Always conclude with "Your future isn’t random — PathPilot helps you build it strategically."`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ brief: response.text || "Unable to retrieve actions right now." });
    } catch (err: any) {
      console.error("Brief backend error:", err);
      res.status(500).json({ error: err.message || "Failed to generate brief" });
    }
  });

  // API Route: Get OAuth URL
  app.get("/api/auth/url", (req, res) => {
    const provider = req.query.provider || "google";
    const origin = req.headers.referer || `http://localhost:${PORT}`;
    const redirectUri = `${new URL(origin).origin}/auth/callback`;

    let clientId = process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID;
    
    // If we have real client credentials, point them to real Google / GitHub OAuth
    if (provider === "github") {
      clientId = process.env.GITHUB_CLIENT_ID || clientId;
      if (clientId) {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
        return res.json({ url: authUrl, isMock: false });
      }
    } else {
      if (clientId) {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid email profile")}`;
        return res.json({ url: authUrl, isMock: false });
      }
    }

    // Fallback: If CLIENT_ID is not configured, generate a beautiful sandbox interactive route
    const sandboxAuthUrl = `/auth/sandbox-login?provider=${provider}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    res.json({ url: sandboxAuthUrl, isMock: true });
  });

  // Sandbox Login Page endpoint
  app.get("/auth/sandbox-login", (req, res) => {
    const provider = req.query.provider || "google";
    const redirectUri = req.query.redirect_uri || "";
    const pName = provider === "google" ? "Google" : "GitHub";

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>PathPilot Sandboxed Authentication</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <style>
          body { font-family: 'Inter', sans-serif; }
          .font-sora { font-family: 'Sora', sans-serif; }
        </style>
      </head>
      <body class="bg-[#0a0a0f] text-[#f0eeff] flex flex-col items-center justify-center min-h-screen p-6">
        <div class="max-w-md w-full bg-[#111118] border border-[#7c6ff7]/30 p-8 rounded-2xl shadow-[0_10px_50px_rgba(124,111,247,0.15)] text-center relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-28 h-28 bg-[#7c6ff7]/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div class="w-14 h-14 rounded-2xl bg-[#7c6ff7]/10 flex items-center justify-center mx-auto mb-6 text-[#7c6ff7] text-xl font-bold select-none border border-[#7c6ff7]/15">
            ✦
          </div>

          <h2 class="font-sora text-xl font-bold mb-2">Simulated ${pName} OAuth</h2>
          <p class="text-xs text-[#8b8aa8] mb-6 leading-relaxed">
            PathPilot developer environment simulated authorization consent screen. Click below to authorize via OAuth and communicate credentials safely back to your workspace.
          </p>

          <div class="bg-[#020205] border border-[#1e1e2e] p-4 rounded-xl text-left text-xs space-y-2 mb-6">
            <div>
              <span class="text-[#8b8aa8] uppercase text-[9px] font-bold tracking-wider">Application</span>
              <p class="font-semibold text-white">PathPilot Sandbox</p>
            </div>
            <div>
              <span class="text-[#8b8aa8] uppercase text-[9px] font-bold tracking-wider">Scopes Requested</span>
              <p class="font-mono text-[#a78bfa] text-[11px]">email, profile, openid</p>
            </div>
            <div>
              <span class="text-[#8b8aa8] uppercase text-[9px] font-bold tracking-wider">Redirect URI</span>
              <p class="font-mono text-[#8b8aa8] text-[10px] truncate">${redirectUri}</p>
            </div>
          </div>

          <button onclick="authorize()" class="w-full font-sora font-semibold text-xs py-3.5 bg-[#7c6ff7] hover:bg-[#a78bfa] transition-colors rounded-xl text-white cursor-pointer shadow-[0_4px_15px_rgba(124,111,247,0.3)]">
            Authorize & Continue →
          </button>
        </div>

        <script>
          function authorize() {
            const code = "sandbox-auth-code-" + Math.random().toString(36).substr(2, 9);
            window.location.href = "${redirectUri}?code=" + code + "&state=${provider}";
          }
        </script>
      </body>
      </html>
    `);
  });

  // OAuth Callback Route
  app.get(["/auth/callback", "/auth/callback/"], (req, res) => {
    const { code, state } = req.query;
    
    // Simulate retrieving user information after successful auth exchange
    const provider = state || "google";
    const userName = provider === "github" ? "GitHub Sandbox User" : "Google Sandbox User";
    const userEmail = provider === "github" ? "github.sandbox@pathpilot.io" : "google.sandbox@pathpilot.io";

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Authentication Completed</title>
      </head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'OAUTH_AUTH_SUCCESS',
              user: {
                name: "${userName}",
                email: "${userEmail}",
                userType: "Job Seeker",
                provider: "${provider}"
              }
            }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
        <p style="font-family: sans-serif; text-align: center; color: #888; margin-top: 50px;">
          Authentication successful. This window should close automatically.
        </p>
      </body>
      </html>
    `);
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
