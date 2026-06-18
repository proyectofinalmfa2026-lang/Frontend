interface PasswordRulesProps {
  password: string;
}

export default function PasswordRules({ password }: PasswordRulesProps) {
  const rules = {
    minLength: password.length >= 8,
    maxLength: password.length <= 15,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  if (!password.length) return null;

  return (
    <div className="mt-2 space-y-1 text-xs">
      <p className={rules.minLength ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Mínimo 8 caracteres
      </p>
      <p className={rules.minLength ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Maximo 15 caracteres
      </p>

      <p className={rules.uppercase ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Al menos una letra mayúscula
      </p>

      <p className={rules.number ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Al menos un número
      </p>
    </div>
  );
}
