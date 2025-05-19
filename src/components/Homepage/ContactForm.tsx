import React, { useState } from 'react';
// Optional: Import icons for social media or contact methods
// import { FaFacebook, FaInstagram, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        // TODO: Implement actual form submission logic here
        // This could be an API call to your backend, or a service like Formspree, EmailJS, etc.
        console.log("Form data submitted:", formData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Example success/error handling
        const success = Math.random() > 0.2; // Simulate 80% success rate
        if (success) {
            setSubmitMessage('Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ liên hệ lại sớm nhất có thể.');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } else {
            setSubmitMessage('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
        setIsSubmitting(false);
    };

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#160F2A] to-[#110C21] relative z-10">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-lg">
                    Liên Hệ & Gửi Phản Hồi
                </h2>

                <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start max-w-5xl mx-auto">
                    {/* Form Section */}
                    <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-8 border border-purple-700/30">
                        <h3 className="text-2xl font-semibold text-purple-300 mb-6 font-['Cinzel',_serif]">Gửi Lời Nhắn Cho Chúng Tôi</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-1">Họ và Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/80 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/80 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                                    placeholder="ban@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-purple-200 mb-1">Chủ đề</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/80 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                                    placeholder="Góp ý về tính năng..."
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-purple-200 mb-1">Nội dung</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/80 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all resize-none"
                                    placeholder="Nội dung phản hồi của bạn..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang gửi...
                                    </>
                                ) : (
                                    "Gửi Phản Hồi"
                                    // <><FaPaperPlane className="mr-2" /> Gửi Phản Hồi</> // If using icon
                                )}
                            </button>
                            {submitMessage && (
                                <p className={`mt-4 text-sm text-center ${submitMessage.includes('lỗi') ? 'text-red-400' : 'text-green-400'}`}>
                                    {submitMessage}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div className="text-gray-300">
                        <h3 className="text-2xl font-semibold text-purple-300 mb-6 font-['Cinzel',_serif]">Thông Tin Liên Hệ Khác</h3>
                        <p className="mb-6 leading-relaxed">
                            Nếu bạn có bất kỳ câu hỏi nào khác, cần hỗ trợ kỹ thuật, hoặc muốn hợp tác, đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây. Chúng tôi luôn sẵn lòng lắng nghe!
                        </p>
                        <div className="space-y-5">
                            <div className="flex items-start">
                                {/* <FaEnvelope className="text-2xl text-pink-400 mr-4 mt-1" /> */}
                                <span className="text-2xl text-pink-400 mr-4 mt-1">📧</span>
                                <div>
                                    <h4 className="font-semibold text-purple-200">Email</h4>
                                    <a href="mailto:support@tarothorizon.com" className="hover:text-pink-400 transition-colors">support@tarothorizon.com</a>
                                </div>
                            </div>
                            {/* Add more contact methods or social media links as needed */}
                            <div className="flex items-start">
                                {/* <FaFacebook className="text-2xl text-pink-400 mr-4 mt-1" /> */}
                                <span className="text-2xl text-pink-400 mr-4 mt-1">📘</span>
                                <div>
                                    <h4 className="font-semibold text-purple-200">Facebook</h4>
                                    <a href="https://facebook.com/tarothorizon" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">facebook.com/tarothorizon</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                {/* <FaInstagram className="text-2xl text-pink-400 mr-4 mt-1" /> */}
                                <span className="text-2xl text-pink-400 mr-4 mt-1">📸</span>
                                <div>
                                    <h4 className="font-semibold text-purple-200">Instagram</h4>
                                    <a href="https://instagram.com/tarothorizon" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">instagram.com/tarothorizon</a>
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 text-sm text-gray-500">
                            Chúng tôi cố gắng phản hồi tất cả các yêu cầu trong vòng 24-48 giờ làm việc.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
