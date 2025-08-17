  "use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    projects: "",
  });

  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = () => {
    setLoading(true);
    setResumeText(""); // Reset

    const resume = `
${formData.name} | ${formData.title}
📧 ${formData.email} | 📱 ${formData.phone}
🔗 LinkedIn: ${formData.linkedin} | 💻 GitHub: ${formData.github}

SUMMARY
${formData.summary}

EXPERIENCE
${formData.experience}

EDUCATION
${formData.education}

SKILLS
${formData.skills}

PROJECTS
${formData.projects}
    `;

    // Fake typing animation
    let i = 0;
    const interval = setInterval(() => {
      setResumeText(resume.slice(0, i));
      i++;
      if (i > resume.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-10 text-pink-600">
      <h1 className="text-4xl font-bold text-center mb-6">
        🌸 AI Resume Builder
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-pink-300">
          <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>

          <Input placeholder="Full Name" name="name" onChange={handleChange} />
          <Input placeholder="Title (e.g. Software Engineer)" name="title" onChange={handleChange} />
          <Input placeholder="Email" name="email" onChange={handleChange} />
          <Input placeholder="Phone" name="phone" onChange={handleChange} />
          <Input placeholder="LinkedIn" name="linkedin" onChange={handleChange} />
          <Input placeholder="GitHub" name="github" onChange={handleChange} />

          <Textarea placeholder="Summary" name="summary" onChange={handleChange} />
          <Textarea placeholder="Experience" name="experience" onChange={handleChange} />
          <Textarea placeholder="Education" name="education" onChange={handleChange} />
          <Textarea placeholder="Skills" name="skills" onChange={handleChange} />
          <Textarea placeholder="Projects" name="projects" onChange={handleChange} />

          <Button
            onClick={generateResume}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-3"
          >
            ✨ Generate Resume
          </Button>
        </div>

        {/* Right column - Resume Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-300">
          <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
          <div className="bg-pink-50 rounded-xl p-4 min-h-[500px] overflow-y-auto font-serif whitespace-pre-line leading-relaxed border border-pink-200">
            {loading ? (
              <p className="italic text-pink-400">⏳ Generating your resume...</p>
            ) : (
              resumeText || "Your resume will appear here."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
