import React, { useState } from 'react';
import { motion } from "framer-motion";

function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        const confirmed = window.confirm('입력하신 내용으로 문의 메일을 보내시겠습니까?');
        if (!confirmed) return;

        setStatus('loading');

        try {
            const response = await fetch(`https://spkorea.art/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setStatus('success');
                alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setStatus('error');
            alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className="contact-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
        >
            <p className="slogan">CONTACT</p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                    <motion.div
                        className="input-group"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.1 }}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="input"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </motion.div>
                    <motion.div
                        className="input-group"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </motion.div>
                </div>
                <motion.div
                    className="input-group"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3 }}
                >
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className="message"
                        value={form.message}
                        onChange={handleChange}
                    />
                </motion.div>
                <motion.button
                    type="submit"
                    className="btn-link1"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4 }}
                >
                    SEND
                </motion.button>
            </form>
        </motion.div>
    );
}

export default ContactForm;
