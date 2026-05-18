import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://kala-samskruthi-web.onrender.com/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          designPreference: form.subject, // Map subject to designPreference or similar
          message: form.message,
          status: 'New'
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      alert('Message sent successfully!');
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-cream-dark">
        <div className="container mx-auto text-center max-w-2xl">
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">
            Contact <em className="text-accent italic">Us</em>
          </h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-body text-foreground block mb-1">Full Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="font-body" />
            </div>
            <div>
              <label className="text-sm font-body text-foreground block mb-1">Email Address</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="font-body" />
            </div>
            <div>
              <label className="text-sm font-body text-foreground block mb-1">Phone Number</label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="font-body" />
            </div>
            <div>
              <label className="text-sm font-body text-foreground block mb-1">Subject</label>
              <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="font-body" />
            </div>
            <div>
              <label className="text-sm font-body text-foreground block mb-1">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required className="font-body" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground py-3 rounded font-body font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-lg p-6">
              <h3 className="font-display text-lg mb-4">Visit Our Studio</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <p className="text-sm font-body text-muted-foreground"> 4-63/20/4, Sri Ramanapuram Colony, Ramanthapur, Hyderabad, Telangana 500039</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <p className="text-sm font-body text-muted-foreground">8121341742</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <p className="text-sm font-body text-muted-foreground">pradeepjain.jillepalli@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-6">
              <h3 className="font-display text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <div key={i} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 hover:border-accent cursor-pointer transition-all">
                    <Icon className="h-5 w-5 text-muted-foreground hover:text-accent" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-lg overflow-hidden h-64">

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5112249389545!2d78.54248077390588!3d17.387237002811943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99410776e415%3A0xddf0d14522a9cbd4!2sKala%20Samskruthi%20Arts!5e0!3m2!1sen!2sin!4v1778917387710!5m2!1sen!2sin"  width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
