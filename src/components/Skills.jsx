import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  Server,
  Palette,
  GitBranch,
  Terminal,
  Cloud,
  Zap
} from 'lucide-react'

const SkillCard = ({ skill, index, category }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const categoryColors = {
    'Frontend': 'from-blue-500 to-cyan-500',
    'Backend': 'from-green-500 to-emerald-500',
    'Tools': 'from-purple-500 to-pink-500',
    'Mobile': 'from-orange-500 to-red-500'
  }

  const categoryIcons = {
    'Frontend': Globe,
    'Backend': Server,
    'Tools': Terminal,
    'Mobile': Smartphone
  }

  const CategoryIcon = categoryIcons[category] || Code

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group relative bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-dark-700 hover:border-primary-500/50"
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category]} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
      
      {/* Skill icon */}
      <div className="relative mb-4">
        <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${categoryColors[category]} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          <skill.icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Floating category icon */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            y: [0, -5, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center border-2 border-dark-600"
        >
          <CategoryIcon className="w-4 h-4 text-primary-500" />
        </motion.div>
      </div>
      
      {/* Skill name */}
      <h3 className="text-lg font-heading font-semibold text-dark-50 text-center mb-2 group-hover:text-primary-500 transition-colors duration-300">
        {skill.name}
      </h3>
      
      {/* Skill level */}
      <div className="text-center mb-4">
        <span className="text-sm text-dark-300 group-hover:text-dark-200 transition-colors duration-300">
          {skill.level}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${categoryColors[category]} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="text-xs text-right mt-1 text-primary-500 font-medium">
        {isInView && skill.proficiency}%
      </div>
      
      {/* Hover effect particles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

const CategorySection = ({ category, skills, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const categoryDescriptions = {
    'Frontend': 'Creating beautiful and interactive user interfaces',
    'Backend': 'Building robust server-side applications and APIs',
    'Tools': 'Development tools and workflow optimization',
    'Mobile': 'Cross-platform mobile application development'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark-50 mb-2">
          {category}
        </h3>
        <p className="text-dark-300 max-w-md mx-auto">
          {categoryDescriptions[category]}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={skillIndex}
            category={category}
          />
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillsData = {
    'Frontend': [
      { name: 'HTML/CSS', level: 'Expert', proficiency: 95, icon: Code },
      { name: 'JavaScript', level: 'Advanced', proficiency: 90, icon: Zap },
      { name: 'React', level: 'Advanced', proficiency: 85, icon: Globe },
      { name: 'Three.js', level: 'Intermediate', proficiency: 70, icon: Palette },
      { name: 'Tailwind CSS', level: 'Advanced', proficiency: 88, icon: Palette },
      { name: 'Framer Motion', level: 'Intermediate', proficiency: 75, icon: Zap }
    ],
    'Backend': [
      { name: 'Node.js', level: 'Advanced', proficiency: 80, icon: Server },
      { name: 'Python', level: 'Intermediate', proficiency: 75, icon: Code },
      { name: 'C++', level: 'Intermediate', proficiency: 70, icon: Terminal },
      { name: 'MongoDB', level: 'Intermediate', proficiency: 72, icon: Database },
      { name: 'Express.js', level: 'Advanced', proficiency: 78, icon: Server },
      { name: 'REST APIs', level: 'Advanced', proficiency: 82, icon: Globe }
    ],
    'Tools': [
      { name: 'Git', level: 'Advanced', proficiency: 85, icon: GitBranch },
      { name: 'VS Code', level: 'Expert', proficiency: 95, icon: Terminal },
      { name: 'Linux', level: 'Intermediate', proficiency: 70, icon: Terminal },
      { name: 'AWS', level: 'Beginner', proficiency: 60, icon: Cloud },
      { name: 'Docker', level: 'Beginner', proficiency: 55, icon: Server },
      { name: 'Vite', level: 'Advanced', proficiency: 80, icon: Zap }
    ]
  }

  return (
    <section id="skills" ref={ref} className="py-20 bg-dark-800/30">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-50 mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Categories */}
        {Object.entries(skillsData).map(([category, skills], index) => (
          <CategorySection
            key={category}
            category={category}
            skills={skills}
            index={index}
          />
        ))}

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-16 text-center"
        >
          <div className="bg-dark-800 rounded-xl p-6 shadow-lg border border-dark-700">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-gradient mb-2"
            >
              15+
            </motion.div>
            <p className="text-dark-300">Projects Completed</p>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-6 shadow-lg border border-dark-700">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-gradient mb-2"
            >
              2+
            </motion.div>
            <p className="text-dark-300">Years of Learning</p>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-6 shadow-lg border border-dark-700">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-gradient mb-2"
            >
              10+
            </motion.div>
            <p className="text-dark-300">Technologies Mastered</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills