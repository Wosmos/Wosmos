#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import ora from 'ora';
import open from 'open';
import gradient from 'gradient-string';
import figlet from 'figlet';

// Styling configuration
const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: '#0097B2',
  float: 'center',
};

// Gradient themes
const titleGradient = gradient(['#0097B2', '#006F83']);
const accentGradient = gradient(['#151920', '#0097B2']);

// Display banner
const displayBanner = () => {
  return new Promise((resolve) => {
    figlet('Wasif Malik', (err, data) => {
      console.clear();
      console.log(titleGradient(data));
      console.log(
        accentGradient('\n Full Stack Developer & Tech Enthusiast \n')
      );
      resolve();
    });
  });
};

// Personal information
const intro = `
${chalk.dim('With 3.5+ years of professional experience in web development,')}
${chalk.dim(
  'I specialize in crafting scalable applications using modern technologies.'
)}
${chalk.dim('Currently pursuing Software Engineering with a GPA of 3.0.')}

${chalk.cyan('🎓 Education:')} Software Engineering Undergraduate (2022-2026)
${chalk.cyan('🌟 Focus:')} Full Stack Development, Cloud Architecture
${chalk.cyan('💫 Passion:')} Astronomy & Building Impactful Solutions
`;

const techStack = `
${chalk.yellow.bold('Technical Expertise:')}

${chalk.blue('Frontend:')}     
• TypeScript, React (2+ years), Next.js (1.5+ years)
• Tailwind CSS, MUI, Bootstrap, SCSS

${chalk.green('Backend:')}      
• Node.js, Express
• MongoDB, Appwrite, Clerk

${chalk.magenta('Mobile:')}       
• React Native with Expo
• Cross-platform Development

${chalk.cyan('Tools & Skills:')}
• Redux for State Management
• Git, Docker, AWS
• UI/UX Design (Photoshop/Illustrator)
`;

const projects = `
${chalk.yellow.bold('Featured Projects:')}

${chalk.blue('🎥 Tellow')} (In Progress)
Cross-platform video calling app using React Native, Expo, Clerk, & GetStream
${chalk.dim(
  'Features: Video calls, Multi-node functionality, Real-time notifications'
)}

${chalk.blue('🎬 Wovies')}
Movie database platform using TMDB API & Redux
${chalk.dim('Features: Movie search, User authentication, Detailed movie info')}

${chalk.blue('📱 Wos-up')} (In Progress)
Social media app using Appwrite
${chalk.dim('Features: User profiles, Posts, Real-time interactions')}

${chalk.blue('✍️ Wizmo')}
Article summarization tool using Rapid API
${chalk.dim(
  'Features: URL-based article summarization, Redux state management'
)}
`;

const links = {
  website: 'https://wasiff.vercel.app',
  linkedin: 'https://www.linkedin.com/in/wasif-malik-79205a1bb',
  github: 'https://github.com/Wosmos',
  email: 'mailto:m.wasifmalik17@gmail.com',
  blog: 'https://hashnode.com/@WosmoBlogs',
};

const menuOptions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to explore?',
    choices: [
      { name: '💻 Technical Expertise', value: 'tech' },
      { name: '🚀 Featured Projects', value: 'projects' },
      { name: '🤝 Connect with Me', value: 'connect' },
      { name: '📝 View Resume', value: 'resume' },
      { name: '✨ About Me', value: 'about' },
      { name: '👋 Exit', value: 'exit' },
    ],
  },
];

async function displaySection(content, color = 'blue') {
  const spinner = ora('Loading...').start();
  await new Promise((resolve) => setTimeout(resolve, 500));
  spinner.stop();
  console.log(boxen(content, { ...boxenOptions, borderColor: color }));
}

async function main() {
  await displayBanner();
  console.log(boxen(intro, boxenOptions));

  while (true) {
    const { action } = await inquirer.prompt(menuOptions);

    switch (action) {
      case 'tech':
        await displaySection(techStack, 'yellow');
        break;

      case 'projects':
        await displaySection(projects, 'green');
        break;

      case 'about':
        await displaySection(
          `
${chalk.yellow.bold('About Me:')}

${chalk.dim('Location:')} Sadar, Hyderabad, Pakistan
${chalk.dim('Contact:')} +923062248224
${chalk.dim('Education:')} Software Engineering (2022-2026)
${chalk.dim('Academic Performance:')} 
• Undergraduate GPA: 3.0
• Intermediate: 89%
• Matriculation: 84.24%

${chalk.cyan('Professional Journey:')}
${chalk.dim('Started as a passionate web developer, evolved into a full-stack')}
${chalk.dim('engineer with expertise in modern frameworks and technologies.')}
${chalk.dim('Committed to delivering pixel-perfect, user-friendly solutions.')}
        `,
          'magenta'
        );
        break;

      case 'connect':
        const { platform } = await inquirer.prompt([
          {
            type: 'list',
            name: 'platform',
            message: 'Choose a platform to connect:',
            choices: [
              { name: '🌐 Portfolio Website', value: 'website' },
              { name: '💼 LinkedIn', value: 'linkedin' },
              { name: '📝 Blog', value: 'blog' },
              { name: '💻 GitHub', value: 'github' },
              { name: '📧 Email', value: 'email' },
            ],
          },
        ]);
        await open(links[platform]);
        break;

      case 'resume':
        console.log(
          boxen(
            `${chalk.cyan('Opening resume in browser...')}\n${chalk.dim(
              "If it doesn't open automatically, visit: "
            )}${links.website}`,
            { ...boxenOptions, borderColor: 'cyan' }
          )
        );
        await open(links.website);
        break;

      case 'exit':
        console.log(
          boxen(
            gradient.rainbow(
              "Thanks for checking out my profile! Let's connect and build something amazing! 👋"
            ),
            { ...boxenOptions, borderColor: 'cyan' }
          )
        );
        process.exit(0);
    }
  }
}

main().catch(console.error);
