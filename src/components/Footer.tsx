import React from 'react';
import { Link } from 'react-router-dom';
// Optional: Import social media icons
// import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
    icon: string | React.ReactElement<{ className?: string }>; // Icon can be a string (emoji) or a React Element that accepts className
    href: string;
    label: string;
}

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: "Trang chủ", path: "/" },
        { label: "Xem Tarot", path: "/tarot/select-spread" }, // Link to main tarot page
        { label: "Hướng dẫn", path: "/guide" },
        { label: "Kiến thức Tarot", path: "/tarot-wiki" }, // Link to your Tarot knowledge base
        { label: "FAQ", path: "/faq" }, // Assuming you might have a dedicated FAQ page too
        { label: "Liên hệ", path: "/contact" } // Assuming you might have a dedicated Contact page
    ];

    const socialLinks: SocialLink[] = [ // Use the SocialLink interface
        // Example using a react-icon component (would require importing it)
        // { icon: <FaFacebookF />, href: "https://facebook.com/tarothorizon", label: "Facebook" }, 
        { icon: "📘", href: "https://facebook.com/tarothorizon", label: "Facebook" },
        { icon: "📸", href: "https://instagram.com/tarothorizon", label: "Instagram" },
        { icon: "🐦", href: "https://twitter.com/tarothorizon", label: "Twitter" },
        { icon: "📧", href: "mailto:support@tarothorizon.com", label: "Email" }
    ];


    return (
        <footer className="bg-[#110C21] text-gray-400 pt-16 pb-8 relative z-10 border-t border-purple-800/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* About Section */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <img src="src/assets/bg/logo.png" alt="Tarot Horizon Logo" className="h-10 drop-shadow-md group-hover:opacity-80 transition-opacity" />
                            <span className="text-xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400">
                                Tarot Horizon
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Khám phá bản thân và tìm kiếm sự dẫn lối từ vũ trụ thông qua nghệ thuật Tarot huyền bí, được hỗ trợ bởi trí tuệ nhân tạo.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-lg font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Liên Kết Nhanh</h5>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.label}>
                                    <Link to={link.path} className="hover:text-pink-400 transition-colors duration-300 text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info / Other Resources */}
                    <div>
                        <h5 className="text-lg font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Hỗ Trợ</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy-policy" className="hover:text-pink-400 transition-colors">Chính Sách Bảo Mật</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-pink-400 transition-colors">Điều Khoản Dịch Vụ</Link></li>
                            <li><Link to="/sitemap" className="hover:text-pink-400 transition-colors">Sơ Đồ Trang</Link></li>
                        </ul>
                    </div>


                    {/* Social Media */}
                    <div>
                        <h5 className="text-lg font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Kết Nối Với Chúng Tôi</h5>
                        <div className="flex space-x-4">
                            {socialLinks.map(social => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-2xl p-2 bg-slate-800/50 rounded-full hover:bg-slate-700/70"
                                >
                                    {typeof social.icon === 'string'
                                        ? social.icon
                                        : React.cloneElement(social.icon, { className: "w-5 h-5" })}
                                </a>
                            ))}
                        </div>
                        <p className="mt-6 text-sm">
                            Nhận cập nhật mới nhất và thông tin chiêm tinh từ chúng tôi!
                        </p>
                        {/* Optional: Newsletter Signup
                        <form className="mt-3">
                            <input type="email" placeholder="Email của bạn" className="w-full px-3 py-2 rounded-md bg-slate-800 border border-purple-700 focus:ring-pink-500 focus:border-pink-500 text-sm outline-none" />
                            <button type="submit" className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md text-sm font-semibold">Đăng ký</button>
                        </form>
                        */}
                    </div>
                </div>

                <div className="border-t border-purple-800/50 pt-8 text-center">
                    <p className="text-sm">
                        &copy; {currentYear} Tarot Horizon. Mọi quyền được bảo lưu.
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                        Website này chỉ mang tính chất tham khảo và giải trí. Luôn sử dụng trực giác và đánh giá cá nhân của bạn.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
