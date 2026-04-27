import React, { useState } from "react";
import { contactPageStyles } from "../assets/dummyStyles";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    const initial = {
        name: "",
        email: "",
        phone: "",
        department: "",
        service: "",
        message: "",
    };

    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const departments = [
        "General Physician",
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Pediatrics",
        "Gynecology",
    ];

    const servicesMapping = {
        "General Physician": [
            "General Consultation",
            "Adult Checkup",
            "Vaccination",
            "Health Screening",
        ],
        Cardiology: [
            "ECG",
            "Echocardiography",
            "Stress Test",
            "Heart Consultation",
        ],
        Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
        Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
        Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
        Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
    };

    const genericServices = [
        "General Consultation",
        "ECG",
        "Blood Test",
        "X-Ray",
        "Ultrasound",
        "Physiotherapy",
        "Vaccination",
    ];

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Full name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
            e.email = "Enter a valid email";

        if (!form.phone.trim()) e.phone = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(form.phone))
            e.phone = "Phone number must be exactly 10 digits";

        if (!form.department && !form.service) {
            e.department = "Please choose a department or service";
            e.service = "Please choose a department or service";
        }

        if (!form.message.trim()) e.message = "Please write a message";

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "department") {
            setForm((prev) => ({ ...prev, department: value, service: "" }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }

        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        const text = `*Contact Request*
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Department: ${form.department || "N/A"}
Service: ${form.service || "N/A"}
Message: ${form.message}`;

        const url = `https://wa.me/9353038876?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");

        setForm(initial);
        setErrors({});
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    }

    const availableServices = form.department
        ? servicesMapping[form.department] || []
        : genericServices;

    return (
        <div className={contactPageStyles.pageContainer}>

            {/* Background */}
            <div className={contactPageStyles.bgAccent1}></div>
            <div className={contactPageStyles.bgAccent2}></div>

            <div className={contactPageStyles.gridContainer}>

                {/* FORM */}
                <div className={contactPageStyles.formContainer}>
                    <h2 className={contactPageStyles.formTitle}>Contact Us</h2>
                    <p className={contactPageStyles.formSubtitle}>
                        Book appointments or send us your query
                    </p>

                    <form onSubmit={handleSubmit} className={contactPageStyles.formSpace}>

                        {/* Name + Email */}
                        <div className={contactPageStyles.formGrid}>
                            <div>
                                <label className={contactPageStyles.label}>
                                    <Mail size={16} /> Email
                                </label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={contactPageStyles.input}
                                />
                                {errors.email && <p className={contactPageStyles.error}>{errors.email}</p>}
                            </div>

                            <div>
                                <label className={contactPageStyles.label}>
                                    Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={contactPageStyles.input}
                                />
                                {errors.name && <p className={contactPageStyles.error}>{errors.name}</p>}
                            </div>
                        </div>

                        {/* Phone + Department */}
                        <div className={contactPageStyles.formGrid}>
                            <div>
                                <label className={contactPageStyles.label}>
                                    <Phone size={16} /> Phone
                                </label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                    className={contactPageStyles.input}
                                />
                                {errors.phone && <p className={contactPageStyles.error}>{errors.phone}</p>}
                            </div>

                            <div>
                                <label className={contactPageStyles.label}>
                                    <MapPin size={16} /> Department
                                </label>
                                <select
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    className={contactPageStyles.input}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((d) => (
                                        <option key={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.department && <p className={contactPageStyles.error}>{errors.department}</p>}
                            </div>
                        </div>

                        {/* Service */}
                        <div>
                            <label className={contactPageStyles.label}>Service</label>
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className={contactPageStyles.input}
                            >
                                <option value="">Select Service</option>
                                {availableServices.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                            {errors.service && <p className={contactPageStyles.error}>{errors.service}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className={contactPageStyles.label}>Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className={contactPageStyles.textarea}
                            />
                            {errors.message && <p className={contactPageStyles.error}>{errors.message}</p>}
                        </div>

                        {/* Button */}
                        <div className={contactPageStyles.buttonContainer}>
                            <button className={contactPageStyles.button}>
                                <Send size={16} /> Send
                            </button>

                            {sent && (
                                <span className={contactPageStyles.sentMessage}>
                                    Redirecting to WhatsApp...
                                </span>
                            )}
                        </div>

                    </form>
                </div>

                {/* RIGHT SIDE */}
                <div className={contactPageStyles.infoContainer}>

                    <div className={contactPageStyles.infoCard}>
                        <h3 className={contactPageStyles.infoTitle}>Contact Info</h3>
                        <p className={contactPageStyles.infoText}>Reach us anytime</p>

                        <div className={contactPageStyles.infoItem}>
                            <Phone /> +91 9353038876
                        </div>
                        <div className={contactPageStyles.infoItem}>
                            <Mail /> hospital@email.com
                        </div>
                        <div className={contactPageStyles.infoItem}>
                            <MapPin /> Mangalore
                        </div>
                    </div>

                    {/* Hours */}
                    <div className={contactPageStyles.hoursContainer}>
                        <h4 className={contactPageStyles.hoursTitle}>Working Hours</h4>
                        <p className={contactPageStyles.hoursText}>Mon - Sat: 9 AM - 8 PM</p>
                        <p className={contactPageStyles.hoursText}>Sunday: Emergency Only</p>
                    </div>

                    {/* Map */}
       <iframe
  src="https://maps.google.com/maps?q=Hospitals%20in%20Mangalore&output=embed"
  className={contactPageStyles.map}
  title="Hospitals in Mangalore"
/>
{/* <iframe
  src="https://maps.google.com/maps?q=Mangalore%20Karnataka%20India&output=embed"
  className={contactPageStyles.map}
  title="Mangalore Map"
/> */}
                </div>

            </div>

            
        </div>
    );
};

export default Contact;