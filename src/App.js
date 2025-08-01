import React, { useState, useEffect, useRef, useCallback } from 'react';

// Main App Component
const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('home'); // State to manage active section for "routing"
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    // Scroll to section handler
    const scrollToSection = useCallback((section) => {
        setActiveSection(section);
        let ref;
        switch (section) {
            case 'home': ref = homeRef; break;
            case 'about': ref = aboutRef; break;
            case 'skills': ref = skillsRef; break;
            case 'projects': ref = projectsRef; break;
            case 'contact': ref = contactRef; break;
            default: return;
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        // Apply dark mode class to body
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`min-h-screen font-inter ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
            {/* Navbar */}
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} scrollToSection={scrollToSection} activeSection={activeSection} />

            <main className="container mx-auto px-4 py-8">
                {/* Home Section */}
                <section id="home" ref={homeRef} className="min-h-screen flex items-center justify-center py-16">
                    <Home scrollToSection={scrollToSection} />
                </section>

                {/* About Me Section */}
                <section id="about" ref={aboutRef} className="py-16">
                    <About />
                </section>

                {/* Skills Section */}
                <section id="skills" ref={skillsRef} className="py-16">
                    <Skills />
                </section>

                {/* Projects Section */}
                <section id="projects" ref={projectsRef} className="py-16">
                    <Projects />
                </section>

                {/* Contact Section */}
                <section id="contact" ref={contactRef} className="py-16">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full bg-gray-200 dark:bg-gray-800 text-center py-4 rounded-t-lg shadow-inner">
                <p className="text-gray-700 dark:text-gray-300 text-sm">&copy; {new Date().getFullYear()} Raj Savita. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Navbar Component
const Navbar = ({ toggleDarkMode, darkMode, scrollToSection, activeSection }) => {
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 rounded-b-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo/Name */}
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Raj Savita
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="home" label="Home" scrollToSection={scrollToSection} activeSection={activeSection} />
                    <NavLink to="about" label="About" scrollToSection={scrollToSection} activeSection={activeSection} />
                    <NavLink to="skills" label="Skills" scrollToSection={scrollToSection} activeSection={activeSection} />
                    <NavLink to="projects" label="Projects" scrollToSection={scrollToSection} activeSection={activeSection} />
                    <NavLink to="contact" label="Contact" scrollToSection={scrollToSection} activeSection={activeSection} />
                    {/* Dark/Light Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.582a1 1 0 01-1.398.018l-2.992-2.992a1 1 0 01.018-1.398 1 1 0 011.398-.018l2.992 2.992a1 1 0 01-.018 1.398zM12 10a2 2 0 11-4 0 2 2 0 014 0zm7-6a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-6 8a1 1 0 01-1 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6-8a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1z"></path></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 pb-4">
                    <div className="flex flex-col items-center space-y-2">
                        <NavLink to="home" label="Home" scrollToSection={scrollToSection} activeSection={activeSection} onClick={() => setIsOpen(false)} />
                        <NavLink to="about" label="About" scrollToSection={scrollToSection} activeSection={activeSection} onClick={() => setIsOpen(false)} />
                        <NavLink to="skills" label="Skills" scrollToSection={scrollToSection} activeSection={activeSection} onClick={() => setIsOpen(false)} />
                        <NavLink to="projects" label="Projects" scrollToSection={scrollToSection} activeSection={activeSection} onClick={() => setIsOpen(false)} />
                        <NavLink to="contact" label="Contact" scrollToSection={scrollToSection} activeSection={activeSection} onClick={() => setIsOpen(false)} />
                        <button
                            onClick={() => { toggleDarkMode(); setIsOpen(false); }}
                            className="w-full text-center py-2 px-4 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// NavLink Component for reusability
const NavLink = ({ to, label, scrollToSection, activeSection, onClick }) => {
    const isActive = activeSection === to;
    return (
        <button
            onClick={() => { scrollToSection(to); if (onClick) onClick(); }}
            className={`py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200
                ${isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
            {label}
        </button>
    );
};

// Home Section Component
const Home = ({ scrollToSection }) => {
    const roles = ["Aspiring Developer", "Problem Solver", "Frontend Enthusiast", "Quick Learner"];
    const [currentText, setCurrentText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = 100; // Typing speed
        const deleteSpeed = 50; // Deleting speed
        const delayBeforeDelete = 1500; // Delay before starting to delete
        const delayBeforeType = 500; // Delay before typing next role

        let timer;

        const handleTyping = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                // Deleting text
                setCurrentText(currentRole.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);

                if (charIndex === 0) {
                    setIsDeleting(false);
                    setRoleIndex(prev => (prev + 1) % roles.length); // Move to next role
                    timer = setTimeout(handleTyping, delayBeforeType);
                } else {
                    timer = setTimeout(handleTyping, deleteSpeed);
                }
            } else {
                // Typing text
                setCurrentText(currentRole.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);

                if (charIndex === currentRole.length) {
                    setIsDeleting(true);
                    timer = setTimeout(handleTyping, delayBeforeDelete);
                } else {
                    timer = setTimeout(handleTyping, typeSpeed);
                }
            }
        };

        timer = setTimeout(handleTyping, typeSpeed);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [charIndex, isDeleting, roleIndex, roles]);

    const handleDownloadResume = () => {
        // In a real application, you would link to your hosted PDF file.
        // For this example, we'll use a placeholder.
        const resumeUrl = 'https://www.africau.edu/images/default/sample.pdf'; // Placeholder URL
        window.open(resumeUrl, '_blank');
    };

    return (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                Hi, I'm <span className="text-blue-600 dark:text-blue-400">Raj Savita</span>
            </h1>
            <p className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-8 h-12 flex items-center justify-center">
                {currentText}
                <span className="animate-pulse ml-1 text-blue-600 dark:text-blue-400">|</span>
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                A passionate developer focused on building engaging and efficient web applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    View My Work
                </button>
                <button
                    onClick={handleDownloadResume}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Download Resume
                </button>
            </div>
        </div>
    );
};

// About Me Section Component
const About = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-gray-700 dark:text-gray-300 space-y-4 text-lg">
                    <p>
                        Hello! I'm Raj Savita, an aspiring Computer Science & Engineering student at Noida Institute of Engineering and Technology.
                        My journey into the world of technology began with a passion for problem-solving and a keen interest in building interactive and efficient web applications.
                    </p>
                    <p>
                        I thrive in fast-paced environments, constantly seeking to learn new technologies and improve my skills.
                        My experience includes developing responsive frontends, integrating RESTful APIs, and deploying applications to the cloud.
                        I am particularly enthusiastic about frontend development and creating seamless user experiences.
                    </p>
                    <p>
                        Outside of coding, I enjoy strategic thinking, as demonstrated by my first-place achievement in the college-level Chess Tournament.
                        I also have a competitive spirit, having secured first place in Badminton Singles at the college Sports Fest.
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Education</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <span className="font-semibold">Bachelor of Technology - Computer Science & Engineering</span>
                            <br />Noida Institute of Engineering and Technology (2022 - Present)
                        </li>
                        <li>
                            <span className="font-semibold">CBSE, 12th</span>
                            <br />WC Rly Sr. Sec. School (2020)
                        </li>
                        <li>
                            <span className="font-semibold">CBSE, 10th</span>
                            <br />WC Rly Sr. Sec. School (2018)
                        </li>
                    </ul>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">Interests</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Web Development (Frontend)</li>
                        <li>Deep Learning & AI</li>
                        <li>Competitive Programming</li>
                        <li>Chess</li>
                        <li>Badminton</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Skills Section Component
const Skills = () => {
    const skillCategories = [
        {
            name: "Languages",
            skills: [
                { name: "Java", icon: "https://www.svgrepo.com/show/452234/java.svg" },
                { name: "Python", icon: "https://www.svgrepo.com/show/452091/python.svg" },
                { name: "JavaScript", icon: "https://www.svgrepo.com/show/452185/js.svg" },
                { name: "TypeScript", icon: "https://www.svgrepo.com/show/373845/typescript.svg" }
            ]
        },
        {
            name: "Frontend",
            skills: [
                { name: "HTML5", icon: "https://www.svgrepo.com/show/452174/html5.svg" },
                { name: "CSS3", icon: "https://www.svgrepo.com/show/452160/css-3.svg" },
                { name: "React.js", icon: "https://www.svgrepo.com/show/452092/react.svg" },
                { name: "Next.js", icon: "https://www.svgrepo.com/show/373976/nextjs.svg" },
                { name: "Tailwind CSS", icon: "https://www.svgrepo.com/show/374118/tailwind-css.svg" }
            ]
        },
        {
            name: "Cloud & DevOps",
            skills: [
                { name: "Docker", icon: "https://www.svgrepo.com/show/452171/docker.svg" },
                { name: "Kubernetes", icon: "https://www.svgrepo.com/show/452220/kubernetes.svg" },
                { name: "AWS", icon: "https://www.svgrepo.com/show/452156/aws.svg" },
                { name: "CI/CD", icon: "https://www.svgrepo.com/show/349479/pipeline.svg" }
            ]
        },
        {
            name: "CS Fundamentals",
            skills: [
                { name: "SQL", icon: "https://www.svgrepo.com/show/303229/sql-database-bad.svg" },
                { name: "DBMS", icon: "https://www.svgrepo.com/show/448250/database.svg" },
                { name: "OOPS", icon: "https://www.svgrepo.com/show/493774/object.svg" },
                { name: "OS", icon: "https://www.svgrepo.com/show/353724/operating-system.svg" },
                { name: "CN", icon: "https://www.svgrepo.com/show/305599/network.svg" }
            ]
        },
        {
            name: "Developer Tools",
            skills: [
                { name: "Git", icon: "https://www.svgrepo.com/show/452210/git.svg" },
                { name: "VS Code", icon: "https://www.svgrepo.com/show/452223/vscode.svg" },
                { name: "MongoDB Compass", icon: "https://www.svgrepo.com/show/373849/mongodb.svg" },
                { name: "IntelliJ IDEA", icon: "https://www.svgrepo.com/show/373611/intellij-idea.svg" }
            ]
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">
                            {category.name}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full shadow-md transition-transform duration-200 hover:scale-105">
                                    {skill.icon && (
                                        <img src={skill.icon} alt={skill.name} className="w-6 h-6" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/24x24/cccccc/333333?text=?' }} />
                                    )}
                                    <span className="font-medium">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Projects Section Component
const Projects = () => {
    const projects = [
        {
            title: "E-Commerce Web App",
            description: "Developed a fully responsive and feature-rich e-commerce frontend application using React and Next.js with TypeScript for strong type safety and scalability. Implemented key features such as product listing, category filtering, search, product detail pages, shopping cart functionality, and client-side persistence using LocalStorage.",
            techUsed: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "LocalStorage"],
            githubLink: "https://github.com/RajSavita", // Placeholder
            demoLink: "https://vercel.com/" // Placeholder (Vercel deployment)
        },
        {
            title: "Pneumonia Detection System Using Deep Learning",
            description: "Built a deep learning-based web application that classifies chest X-ray images to detect pneumonia. Utilized a Convolutional Neural Network (CNN) trained on medical image data and deployed the model using a Flask web interface for real-time predictions.",
            techUsed: ["Python", "Flask", "HTML5", "CSS3", "TensorFlow", "Keras", "scikit-learn", "OpenCV"],
            githubLink: "https://github.com/RajSavita", // Placeholder
            demoLink: "#" // No live demo provided in resume, so no link
        },
        {
            title: "Soil Yield Prediction System (HackXNiet)",
            description: "Developed a React.js & TypeScript frontend for a Soil Yield Prediction system, integrating RESTful APIs for real-time insights. Developed a responsive frontend using HTML, CSS, and JavaScript, and integrated it with a Flask backend for real-time input handling and result display.",
            techUsed: ["React.js", "TypeScript", "Python", "Flask", "HTML5", "CSS3", "JavaScript", "scikit-learn", "Pandas", "NumPy"],
            githubLink: "https://github.com/RajSavita", // Placeholder
            demoLink: "#" // No live demo provided in resume, so no link
        },
        {
            title: "Pneumonia Detection Web App (GeeksForGeeks Hackfest)",
            description: "Developed a responsive and user-friendly web interface for chest X-ray image upload and real-time pneumonia detection. Integrated frontend with Flask backend to process images, return predictions, and render results dynamically. Implemented input validation, visual feedback, and mobile responsiveness to enhance overall user experience.",
            techUsed: ["Python", "Flask", "HTML5", "CSS3"],
            githubLink: "https://github.com/RajSavita", // Placeholder
            demoLink: "#" // No live demo provided in resume, so no link
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                        {/* Placeholder Image */}
                        <img
                            src={`https://placehold.co/600x400/${index % 2 === 0 ? '4299E1' : 'E14299'}/ffffff?text=Project+${index + 1}`}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{project.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techUsed.map((tech, techIndex) => (
                                    <span key={techIndex} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex space-x-4">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 text-sm font-medium shadow"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.417 2.865 8.167 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.867-.013-1.702-2.782.603-3.37-1.341-3.37-1.341-.454-1.153-1.11-1.465-1.11-1.465-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.089 2.91.832.092-.647.35-1.089.636-1.338-2.22-.253-4.555-1.116-4.555-4.949 0-1.092.39-1.983 1.029-2.682-.103-.253-.446-1.27-.098-2.65 0 0 .84-.27 2.75 1.022A9.907 9.907 0 0110 4.877c.85.004 1.7.11 2.504.328 1.909-1.292 2.747-1.022 2.747-1.022.348 1.38.006 2.398-.098 2.65.64.699 1.029 1.59 1.029 2.682 0 3.841-2.339 4.691-4.566 4.941.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.482C17.135 18.18 20 14.43 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg>
                                        GitHub
                                    </a>
                                )}
                                {project.demoLink && project.demoLink !== '#' && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Contact Form Component
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data submitted:', formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' }); // Clear form
            setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Contact Me</h2>
            {isSubmitted && (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-3 rounded-md mb-6 text-center shadow-md" role="alert">
                    Your message has been sent successfully!
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                        placeholder="Your Name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                        placeholder="Your message here..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 transform hover:scale-105"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;
