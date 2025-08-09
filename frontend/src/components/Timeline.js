import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeline = [
	{
		year: '2025',
		title: 'Research Intern',
		org: 'Cyber Guard 360',
		desc: 'Built a Linux kernel module to safeguard data during ransomware attacks.',
		projectId: null,
		details:
			'Worked on low-level kernel programming, implemented real-time monitoring, and collaborated with security experts to test the module in simulated attack environments.',
	},
	{
		year: '2024',
		title: 'LLM Lung Disease Detector',
		org: 'Personal Project',
		desc: 'Developed an LLM-powered lung disease detection tool.',
		projectId: 'llm-lung',
		details:
			'Used large language models and medical datasets to build a tool that predicts lung diseases from X-ray images. Integrated explainable AI techniques for transparency.',
	},
	{
		year: '2023',
		title: 'Diabetes Prediction App',
		org: 'Personal Project',
		desc: 'Created a mobile app for diabetes prediction using ML.',
		projectId: 'diabetes-app',
		details:
			'Designed and deployed a cross-platform app using React Native and TensorFlow.js. The app provides instant risk assessment and lifestyle recommendations.',
	},
	{
		year: '2022',
		title: 'ML Quest Hackathon (4th Place)',
		org: 'IEEE CIS SBC, GHRCE',
		desc: 'Identified fake job listings using ML. Placed 4th in a national hackathon.',
		projectId: 'ml-quest',
		details:
			'Led a team to build a classifier for fake job postings. Used NLP, feature engineering, and ensemble models. Presented findings to industry judges.',
	},
	{
		year: '2022',
		title: 'ML Spark - Tvastr’25 (2nd Place)',
		org: 'University of Hyderabad',
		desc: 'Secured 2nd place in ML Spark at Tvastr’25 Analytics Fest.',
		projectId: 'ml-spark',
		details:
			'Developed a predictive analytics solution for real-world business data. Collaborated with peers and presented at the University of Hyderabad.',
	},
	{
		year: '2021',
		title: 'Deep Learning Specialization',
		org: 'Coursera',
		desc: 'Completed Andrew Ng’s Deep Learning Specialization.',
		projectId: null,
		details:
			'Mastered neural networks, CNNs, RNNs, and sequence models. Applied concepts in several mini-projects and coursework.',
	},
];

const Timeline = () => {
	const [open, setOpen] = useState(null);

	return (
		<section
			id="timeline"
			className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#ede9fe]/70 via-[#f3e8ff]/60 to-[#fbbf24]/10 dark:from-[#18122b]/80 dark:via-[#312e81]/70 dark:to-[#000]/60 backdrop-blur-lg text-black dark:text-white transition-colors duration-300"
		>
			<h2 className="text-4xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg">
				<span className="inline-block bg-gradient-to-r from-purple-500 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">
					Timeline
				</span>
			</h2>
			<div className="max-w-3xl mx-auto">
				{timeline.map((item, i) => (
					<motion.div
						key={item.title}
						className={`flex items-start mb-12 group transition-transform duration-300 ${
							item.projectId ? 'cursor-pointer hover:scale-[1.04] hover:shadow-xl' : ''
						}`}
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7, delay: i * 0.12 }}
						onClick={() => {
							if (item.projectId) {
								const el = document.getElementById(item.projectId);
								if (el) {
									el.scrollIntoView({ behavior: 'smooth', block: 'center' });
									el.classList.add('ring-4', 'ring-purple-400');
									setTimeout(() => el.classList.remove('ring-4', 'ring-purple-400'), 1200);
								}
							}
							setOpen(open === i ? null : i);
						}}
						tabIndex={0}
						onKeyDown={(e) => {
							if ((e.key === 'Enter' || e.key === ' ') && item.projectId) {
								const el = document.getElementById(item.projectId);
								if (el) {
									el.scrollIntoView({ behavior: 'smooth', block: 'center' });
									el.classList.add('ring-4', 'ring-purple-400');
									setTimeout(() => el.classList.remove('ring-4', 'ring-purple-400'), 1200);
								}
								setOpen(open === i ? null : i);
							}
						}}
						aria-expanded={open === i}
					>
						{/* Timeline Dot & Line */}
						<div className="flex flex-col items-center mr-6 relative">
							<motion.div
								className="w-6 h-6 bg-gradient-to-br from-purple-400 via-fuchsia-400 to-yellow-400 rounded-full shadow-lg border-2 border-white dark:border-gray-900 mb-1 flex items-center justify-center"
								animate={open === i ? { scale: 1.18, boxShadow: "0 0 0 6px #fbbf2466" } : { scale: 1, boxShadow: "0 2px 12px #a78bfa55" }}
								transition={{ type: "spring", stiffness: 300, damping: 18 }}
							>
								<span className="block w-2 h-2 bg-white dark:bg-gray-900 rounded-full" />
							</motion.div>
							{i < timeline.length - 1 && (
								<div className="w-1 flex-1 bg-gradient-to-b from-purple-200 via-fuchsia-200 to-yellow-100 dark:from-purple-900 dark:via-fuchsia-900 dark:to-yellow-900 opacity-70" />
							)}
						</div>
						{/* Timeline Content */}
						<div>
							<div className="text-lg sm:text-xl font-bold text-purple-900 dark:text-purple-100 mb-1 flex items-center gap-2">
								<span className="inline-block px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 text-xs font-semibold shadow-sm">
									{item.year}
								</span>
								<span>{item.title}</span>
							</div>
							<div className="text-purple-600 dark:text-yellow-300 font-semibold mb-1">
								{item.org}
							</div>
							<div className="text-gray-700 dark:text-gray-300">{item.desc}</div>
							<AnimatePresence>
								{open === i && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className="mt-3 p-4 bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-lg text-sm text-gray-800 dark:text-gray-100 border border-purple-200 dark:border-purple-700 transition-all duration-300"
									>
										{item.details}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Timeline;