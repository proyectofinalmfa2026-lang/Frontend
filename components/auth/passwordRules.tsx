interface PasswordRulesProps {
  password: string;
}

export default function PasswordRules({ password }: PasswordRulesProps) {
  const rules = {
    minLength: password.length >= 10,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };

  if (!password.length) return null;

  return (
    <div className="mt-2 space-y-1 text-xs">
      <p className={rules.minLength ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Mínimo 10 caracteres
      </p>

      <p className={rules.uppercase ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Una letra mayúscula
      </p>

      <p className={rules.number ? "text-green-500" : "text-[#7B7497]"}>
        ✓ Al menos un número
      </p>
    </div>
  );
}
