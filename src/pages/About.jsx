import { CTA } from '../components';
import { experiences, skills } from '../constants';

const About = () => {
    return (
        <section className="max-container">
            <h1 className="head-text">
                Hello, I'm{' '}
                <span className="blue-gradient_text font-semibold drop-shadow">
                    Jane
                </span>{' '}
                👋
            </h1>

            <div className="mt-5 flex flex-col gap-3 text-slate-500">
                <p>
                    Software Engineer based in Vietnam, specializing in technical
                    education through hands-on learning and building.
                </p>
            </div>

            <div className="py-10 flex flex-col">
                <h3 className="subhead-text">My Skills</h3>

                <div className="mt-16 flex flex-wrap gap-12">
                    {skills.map((skill) => (
                        <div className="block-container w-20 h-20" key={skill.name}>
                            <div className="btn-back rounded-xl" />
                            <div className="btn-front rounded-xl flex justify-center items-center">
                                <img
                                    src={skill.imageUrl}
                                    alt={skill.name}
                                    title={skill.name}
                                    className="w-1/2 h-1/2 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-16">
                <h3 className="subhead-text">Work Experience</h3>
                <div className="mt-5 flex flex-col gap-3 text-slate-500">
                    <p>
                        I've worked with all sorts of companies, leveling up my skills
                        and collaborating with smart people. Here's the rundown:
                    </p>
                </div>

                <div className="mt-12 flex flex-col gap-8">
                    {experiences.map((experience) => (
                        <div
                            key={`${experience.company_name}-${experience.title}`}
                            className="experience-card"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full flex justify-center items-center shrink-0"
                                    style={{ background: experience.iconBg }}
                                >
                                    <img
                                        src={experience.icon}
                                        alt={experience.company_name}
                                        className="w-[60%] h-[60%] object-contain"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-black text-xl font-poppins font-semibold">
                                        {experience.title}
                                    </h4>
                                    <p className="text-black-500 font-medium text-base">
                                        {experience.company_name}
                                    </p>
                                    <p className="text-sm text-slate-400">{experience.date}</p>
                                </div>
                            </div>

                            <ul className="my-5 list-disc ml-5 space-y-2">
                                {experience.points.map((point, index) => (
                                    <li
                                        key={`experience-point-${index}`}
                                        className="text-black-500/70 font-normal pl-1 text-sm"
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-slate-200" />

            <CTA />
        </section>
    )
}

export default About
