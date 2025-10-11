import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, Calendar, Code } from 'lucide-react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-dark-800 rounded-2xl shadow-2xl z-50 overflow-auto"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark-50 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-500 font-medium">{project.category}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-dark-300" />
                </button>
              </div>

              {/* Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <h4 className="text-xl font-heading font-semibold text-dark-50 mb-3">
                    Project Overview
                  </h4>
                  <p className="text-dark-300 leading-relaxed mb-4">
                    {project.fullDescription}
                  </p>
                  
                  <h4 className="text-xl font-heading font-semibold text-dark-50 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-dark-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-semibold text-dark-50 mb-3">
                    Project Info
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        <span className="text-dark-300 font-medium">Timeline</span>
                      </div>
                      <span className="text-dark-300 text-sm">{project.timeline}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-primary-500" />
                        <span className="text-dark-300 font-medium">Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-dark-50 rounded-lg transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const ProjectCard = ({ project, index, onOpenModal }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark-800/90 hover:bg-dark-700 rounded-full text-dark-50 hover:text-primary-500 transition-all duration-200 backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-800/90 hover:bg-dark-700 rounded-full text-dark-50 hover:text-primary-500 transition-all duration-200 backdrop-blur-sm"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-primary-500/20 text-primary-500 text-sm font-medium rounded-full">
            {project.category}
          </span>
          <span className="text-dark-400 text-sm">{project.year}</span>
        </div>

        <h3 className="text-xl font-heading font-bold text-dark-50 mb-3 group-hover:text-primary-500 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-dark-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-lg"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-lg">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="w-full py-2 text-primary-500 hover:text-white hover:bg-primary-500 border border-primary-500 rounded-lg transition-all duration-300 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Full Stack",
      year: "2024",
      description: "A modern e-commerce platform with user authentication, product management, and payment integration.",
      fullDescription: "A comprehensive e-commerce solution built with React and Node.js, featuring a responsive design, secure payment processing, and an intuitive admin dashboard. The platform includes advanced features like real-time inventory management, order tracking, and customer analytics.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://example.com",
      timeline: "3 months",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filters",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Order management system",
        "Admin dashboard for inventory management"
      ]
    },
    {
      id: 2,
      title: "Task Management App",
      category: "Frontend",
      year: "2024",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      fullDescription: "An intuitive task management solution designed for teams, featuring drag-and-drop functionality, real-time collaboration, and comprehensive project tracking. Built with modern web technologies to ensure smooth performance and user experience.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      technologies: ["React", "TypeScript", "Firebase", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://example.com",
      timeline: "2 months",
      features: [
        "Drag and drop task management",
        "Real-time team collaboration",
        "Project progress tracking",
        "Custom task categories and labels",
        "Team member assignment",
        "Mobile-responsive design"
      ]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      category: "Frontend",
      year: "2023",
      description: "An interactive weather dashboard with location-based forecasts and beautiful data visualizations.",
      fullDescription: "A comprehensive weather application that provides detailed forecasts, interactive maps, and weather analytics. Features location-based services, historical weather data, and customizable dashboard layouts for an enhanced user experience.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      technologies: ["React", "D3.js", "Weather API", "Chart.js", "CSS3"],
      github: "https://github.com",
      demo: "https://example.com",
      timeline: "1 month",
      features: [
        "Real-time weather data",
        "7-day weather forecast",
        "Interactive weather maps",
        "Location-based services",
        "Weather data visualizations",
        "Custom location bookmarks"
      ]
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "Frontend",
      year: "2024",
      description: "A modern portfolio website with 3D animations and smooth interactions built with Three.js.",
      fullDescription: "This very portfolio website you're viewing, featuring advanced 3D animations, particle systems, and smooth scroll interactions. Built with modern web technologies to showcase development skills and creative design capabilities.",
      image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&h=600&fit=crop",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite"],
      github: "https://github.com",
      demo: "#",
      timeline: "2 weeks",
      features: [
        "3D particle background animation",
        "Smooth scroll interactions",
        "Responsive design",
        "Dark/light theme toggle",
        "Interactive contact form",
        "SEO optimized"
      ]
    }
  ]

  const categories = ['All', ...new Set(projects.map(project => project.category))]
  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section id="projects" ref={ref} className="py-20 bg-dark-900">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-50 mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent works that showcase my skills and creativity
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  : 'bg-dark-800 text-dark-300 hover:text-dark-50 hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={openModal}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

export default Projects