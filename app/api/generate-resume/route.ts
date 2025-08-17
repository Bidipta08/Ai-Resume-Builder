import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, jobTitle, skills, experience } = await req.json();

    // Format input safely
    const skillsText = Array.isArray(skills) ? skills.join(", ") : skills;
    const experienceText = Array.isArray(experience) ? experience.join("\n") : experience;

    const prompt = `
    Create a professional resume with the following details:
    Name: ${name}
    Job Title: ${jobTitle}
    Skills: ${skillsText}
    Experience: ${experienceText}
    `;

    // Call OpenRouter API instead of OpenAI
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // store key in .env.local
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const resumeText = data.choices?.[0]?.message?.content || "No resume generated";

    console.log("Resume generated:", resumeText);

    return NextResponse.json({ resume: resumeText });
  } catch (error) {
    console.error("Error in resume generation:", error);
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 });
  }
}
