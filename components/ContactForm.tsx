import FormField from "./FormField";

export interface ContactFormProps {}

const ContactForm = ({}: ContactFormProps) => {
  return (
    <div className="w-full px-7 py-9 bg-white border-black border-2 rounded-lg">
      <form name="contact" method="POST" data-netlify="true">
        <FormField
          id="given-name"
          type="text"
          placeholder="John"
          label="First Name"
          required
        />
        <FormField
          id="family-name"
          type="text"
          placeholder="Doe"
          label="Last Name"
          required
        />
        <FormField
          id="email"
          type="email"
          placeholder="alias@provider.com"
          label="Email"
          required
        />
        <FormField
          id="body"
          type="textarea"
          placeholder="Ask me a question, or request a commission!"
          label="Message"
          required
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-neutral-700 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
