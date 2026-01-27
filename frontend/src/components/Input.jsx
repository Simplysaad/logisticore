const InputField = ({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  required
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base ${
        error
          ? "border-red-300 bg-red-50 focus:ring-red-500"
          : "border-gray-200 hover:border-gray-300 focus:ring-blue-500"
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1 0z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// Select Component
const SelectField = ({
  label,
  name,
  value,
  error,
  onChange,
  options,
  required
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base appearance-none bg-white ${
        error
          ? "border-red-300 bg-red-50 focus:ring-red-500"
          : "border-gray-200 hover:border-gray-300 focus:ring-blue-500"
      }`}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// Textarea Component
const TextareaField = ({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  rows
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border-2 rounded-xl resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base ${
        error
          ? "border-red-300 bg-red-50 focus:ring-red-500"
          : "border-gray-200 hover:border-gray-300 focus:ring-blue-500"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export { TextareaField, InputField, SelectField };
