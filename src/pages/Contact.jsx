import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Loader from '../components/Loader';
import Fox from '../models/Fox';
import { socialLinks } from '../constants';

// Replace with the address you want messages delivered to.
const CONTACT_EMAIL = 'you@example.com';

const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const [status, setStatus] = useState(null);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleFocus = () => setCurrentAnimation('walk');
    const handleBlur = () => setCurrentAnimation('idle');

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentAnimation('hit');

        // No mail backend is wired up, so hand the draft to the visitor's
        // own mail client instead of silently dropping it.
        const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        setStatus('Opening your mail app with the message ready to send.');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setCurrentAnimation('idle'), 2500);
    };

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7 mt-14"
                >
                    <label className="text-black-500 font-semibold">
                        Name
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="John Doe"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="john@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Your Message
                        <textarea
                            name="message"
                            rows={4}
                            className="textarea"
                            placeholder="Let me know how I can help you!"
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>

                    <button
                        type="submit"
                        className="btn"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        Send Message
                    </button>

                    {status && <p className="text-sm text-slate-500">{status}</p>}
                </form>

                <div className="mt-10 flex gap-6">
                    {socialLinks
                        .filter((social) => social.link.startsWith('http'))
                        .map((social) => (
                            <a
                                key={social.name}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-slate-500 hover:text-blue-600"
                            >
                                <img
                                    src={social.iconUrl}
                                    alt={social.name}
                                    className="w-6 h-6 object-contain"
                                />
                                {social.name}
                            </a>
                        ))}
                </div>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />

                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}

export default Contact
