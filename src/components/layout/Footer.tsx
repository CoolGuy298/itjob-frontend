// import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* For Employers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">For Employers</h3>
          <ul className="space-y-2">
            <li><a href="/post-job" className="hover:text-gray-400">Post a Job</a></li>
            <li><a href="/manage-applications" className="hover:text-gray-400">Manage Applications</a></li>
            <li><a href="/employer-pricing" className="hover:text-gray-400">Pricing</a></li>
          </ul>
        </div>

        {/* For Employees */}
        <div>
          <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
          <ul className="space-y-2">
            <li><a href="/browse-jobs" className="hover:text-gray-400">Browse Jobs</a></li>
            <li><a href="/upload-resume" className="hover:text-gray-400">Upload Resume</a></li>
            <li><a href="/career-advice" className="hover:text-gray-400">Career Advice</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:support@itjobsite.com" className="hover:text-gray-400">support@itjobsite.com</a></li>
            <li>Phone: +1 (123) 456-7890</li>
            <li><a href="/contact-us" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
