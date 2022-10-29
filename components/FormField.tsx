export interface FormFieldProps {
  id: string;
  name?: string;
  placeholder?: string;
  type: string | "textarea";
  label: string;
  required?: boolean;
}

const FormField = ({
  id,
  name = id,
  placeholder = "",
  type,
  label,
  required = false,
}: FormFieldProps) => {
  const inputClass =
    "appearance-none border-black border-2 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className="relative mb-4">
      <label
        className="absolute block -top-[0.6em] left-4 bg-white text-gray-700 px-2 text-sm font-bold mb-2 uppercase rounded-md"
        htmlFor={id}
      >
        {label}
      </label>
      {type == "textarea" ? (
        <textarea
          className={inputClass}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          className={inputClass}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
