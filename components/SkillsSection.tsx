"use client";

import { motion, type Variants } from "framer-motion";

// مهارت‌ها با لوگوها - می‌توانید بعداً لوگوهای SVG را اضافه کنید
const skills = [
  { name: "React", logo: "/logos/react.svg", emoji: "⚛️" },
  { name: "Next.js", logo: "/logos/nextjs.svg", emoji: "▲" },
  { name: "TypeScript", logo: "/logos/typescript.svg", emoji: "📘" },
  { name: "TailwindCSS", logo: "/logos/tailwind.svg", emoji: "🎨" },
  { name: "Node.js", logo: "/logos/nodejs.svg", emoji: "🟢" },
  { name: "Express.js", logo: "/logos/express.svg", emoji: "🚂" },
  { name: "MongoDB", logo: "/logos/mongodb.svg", emoji: "🍃" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg", emoji: "🐘" },
  { name: "Redis", logo: "/logos/redis.svg", emoji: "🔴" },
  { name: "Git", logo: "/logos/git.svg", emoji: "📦" },
  { name: "Docker", logo: "/logos/docker.svg", emoji: "🐳" },
  { name: "AWS", logo: "/logos/aws.svg", emoji: "☁️" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut cubic-bezier
    },
  }),
};

export function SkillsSection() {
  return (
    <section 
      id="skills" 
      aria-labelledby="skills-title"
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h2
          id="skills-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
        >
          مهارت‌های من
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-brand to-indigo-500 rounded-full mx-auto mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-900/80 hover:from-gray-100 dark:hover:from-gray-700/70 hover:to-gray-50 dark:hover:to-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-brand dark:hover:border-brand"
            >
              {/* Logo or Emoji */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                {/* استفاده از emoji به عنوان fallback تا زمانی که لوگوها اضافه شوند */}
                <span className="text-4xl" role="img" aria-label={skill.name}>
                  {skill.emoji}
                </span>
              </div>
              
              <span className="text-base font-medium text-gray-900 dark:text-gray-100 text-center">
                {skill.name}
              </span>
              
              {/* Hover effect gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand/0 via-blue-500/0 to-indigo-500/0 group-hover:from-brand/5 group-hover:via-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

