import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Updated skills data with more color and clarity
const skills = [
	{
		name: "React",
		icon: "⚛️",
		pitch: "Built interactive SPAs and dashboards using React, hooks, and context. I love component-driven development and have used React in both personal and team projects.",
		certificates: [
			{ name: "React Advanced", img: "/certificates/react-advanced.png", file: "/certificates/react-advanced.pdf" }
		],
		projects: [
			{ name: "Portfolio", link: "#projects", desc: "This portfolio site, built with React, Framer Motion, and Tailwind." }
		]
	},
	{
		name: "Node.js",
		icon: "🟩",
		pitch: "Developed RESTful APIs and real-time apps using Node.js and Express. Enjoy building scalable backend services and integrating with databases.",
		certificates: [
			{ name: "Node.js Bootcamp", img: "/certificates/node-bootcamp.png", file: "/certificates/node-bootcamp.pdf" }
		],
		projects: [
			{ name: "Realtime Chat", link: "#projects", desc: "A chat app using Node.js, Socket.io, and MongoDB." }
		]
	},
	{
		name: "Python",
		icon: "🐍",
		pitch: "Used Python for data science, scripting, and backend APIs. Strong with pandas, NumPy, and Flask. I automate all the boring stuff.",
		certificates: [
			{ name: "Deep Learning Specialization", img: "/certificates/deep-learning.png", file: "/certificates/deep-learning.pdf" }
		],
		projects: [
			{ name: "ML Spark", link: "#projects", desc: "Award-winning ML project using Python and scikit-learn." }
		]
	},
	{
		name: "MongoDB",
		icon: "🍃",
		pitch: "Designed flexible schemas and built scalable apps with MongoDB. Love the freedom of NoSQL for rapid prototyping.",
		certificates: [
			{ name: "MongoDB Basics", img: "/certificates/mongodb-basics.png", file: "/certificates/mongodb-basics.pdf" }
		],
		projects: [
			{ name: "Task Manager", link: "#projects", desc: "A productivity app using MongoDB, Express, and React." }
		]
	},
	{
		name: "Linux",
		icon: "🐧",
		pitch: "Confident with Linux CLI, scripting, and server management. I break things, fix them, and automate the rest.",
		certificates: [
			{ name: "Linux Essentials", img: "/certificates/linux-essentials.png", file: "/certificates/linux-essentials.pdf" }
		],
		projects: [
			{ name: "Server Setup Scripts", link: "#projects", desc: "Automated server provisioning with Bash and Python." }
		]
	},
	{
		name: "Machine Learning",
		icon: "🤖",
		pitch: "Built and deployed ML models for competitions and real-world data. I enjoy feature engineering and model tuning.",
		certificates: [
			{ name: "ML Spark - Tvastr’25", img: "/certificates/ml-spark-tvastr25.png", file: "/certificates/ml-spark-tvastr25.pdf" }
		],
		projects: [
			{ name: "Fake Job Detector", link: "#projects", desc: "ML Quest Hackathon project for identifying fake job listings." }
		]
	},
	{
		name: "Tailwind CSS",
		icon: "🌈",
		pitch: "Rapidly prototype and style modern UIs with Tailwind. Utility-first CSS is my jam.",
		certificates: [
			{ name: "Tailwind Mastery", img: "/certificates/tailwind-mastery.png", file: "/certificates/tailwind-mastery.pdf" }
		],
		projects: [
			{ name: "Landing Page", link: "#projects", desc: "A beautiful, responsive landing page built with Tailwind." }
		]
	},
	{
		name: "Framer Motion",
		icon: "🎞️",
		pitch: "Bring interfaces to life with smooth, interactive animations using Framer Motion.",
		certificates: [
			{ name: "Framer Motion Essentials", img: "/certificates/framer-motion.png", file: "/certificates/framer-motion.pdf" }
		],
		projects: [
			{ name: "Animated Portfolio", link: "#projects", desc: "This portfolio, with all the motion magic." }
		]
	},
	{
		name: "Azure",
		icon: "☁️",
		pitch: "Deployed cloud apps and services on Azure. Familiar with Azure Fundamentals and cloud best practices.",
		certificates: [
			{ name: "Microsoft Azure Fundamentals", img: "/certificates/azure-fundamentals.png", file: "/certificates/Azure.pdf" }
		],
		projects: [
			{ name: "Cloud Resume", link: "#projects", desc: "Resume hosted on Azure Blob Storage." }
		]
	},
];

const Skills = () => {
	const [open, setOpen] = useState(null);

	return (
		<section id="skills" className="py-24 px-6 bg-gradient-to-br from-white/60 via-purple-50/60 to-yellow-50/40 dark:from-[#18122b]/80 dark:via-[#312e81]/70 dark:to-[#000]/60 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
			<h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
				Skills & Tech
			</h2>
			<div className="flex flex-wrap justify-center gap-8">
				{skills.map((skill, i) => (
					<motion.div
						key={skill.name}
						className="relative flex flex-col items-center bg-white/60 dark:bg-gray-800/60 border-2 border-transparent hover:border-purple-400 shadow-xl rounded-2xl backdrop-blur-lg transition-colors duration-300 p-7 w-44 cursor-pointer group"
						whileHover={{ scale: 1.09, boxShadow: "0 8px 32px #a78bfa33" }}
						onClick={() => setOpen(i)}
						tabIndex={0}
						onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpen(i); }}
						aria-expanded={open === i}
					>
						<span className="text-5xl mb-4 drop-shadow-lg">{skill.icon}</span>
						<span className="font-semibold text-lg text-purple-700 dark:text-yellow-200">{skill.name}</span>
					</motion.div>
				))}
			</div>

			{/* Modal Dialog */}
			<AnimatePresence>
				{open !== null && (
					<motion.div
						className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpen(null)}
					>
						<motion.div
							className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={e => e.stopPropagation()}
						>
							<button
								className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
								onClick={() => setOpen(null)}
								aria-label="Close"
							>×</button>
							<div className="flex items-center gap-4 mb-4">
								<span className="text-4xl">{skills[open].icon}</span>
								<span className="font-bold text-2xl text-purple-700 dark:text-yellow-200">{skills[open].name}</span>
							</div>
							<p className="mb-4 text-gray-700 dark:text-gray-200">{skills[open].pitch}</p>
							{skills[open].certificates?.length > 0 && (
								<div className="mb-4">
									<div className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Certificates:</div>
									<div className="flex gap-4 flex-wrap">
										{skills[open].certificates.map(cert => (
											<a key={cert.name} href={cert.file} target="_blank" rel="noopener noreferrer" className="block">
												<img src={cert.img} alt={cert.name} className="w-20 h-20 object-contain rounded shadow border" />
												<div className="text-xs text-center mt-1">{cert.name}</div>
											</a>
										))}
									</div>
								</div>
							)}
							{skills[open].projects?.length > 0 && (
								<div>
									<div className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Projects:</div>
									<ul className="list-disc ml-6">
										{skills[open].projects.map(proj => (
											<li key={proj.name}>
												<a href={proj.link} className="text-purple-600 dark:text-purple-300 underline" target="_blank" rel="noopener noreferrer">{proj.name}</a>
												<span className="ml-2 text-gray-600 dark:text-gray-300">{proj.desc}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Skills;