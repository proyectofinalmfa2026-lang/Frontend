interface UsernameRulesProps {
  username: string;
}

export default function UsernameRules({ username }: UsernameRulesProps) {
  const rules = {
    minLength: username.length >= 3,
    maxLength: username.length <= 20,
    validFormat: /^[a-z0-9_]+$/.test(username),
  };

  if (!username.length) return null;

  return (
    <div className="mt-2 space-y-1">
      <p
        className={`text-xs ${
          rules.minLength ? "text-green-500" : "text-[#7B7497]"
        }`}
      >
        ✓ Mínimo 3 caracteres
      </p>
      <p
        className={`text-xs ${
          rules.validFormat ? "text-green-500" : "text-[#7B7497]"
        }`}
      >
        ✓ Solo letras minúsculas, números y _
      </p>

      <p className="text-xs text-right text-[#7B7497]">{username.length}/20</p>
    </div>
  );
}
