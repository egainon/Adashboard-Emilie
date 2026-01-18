import { useEffect, useState } from 'react';

function Skills({skills, themeId}) {

  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    // À chaque fois que la prop skills change, MAJ du state local skillsList pour le synchroniser.
    setSkillsList(skills);
  }, [skills]);

  // PUT
  const updateStatus = async (skillIndex, newStatus) => {
    try {
      const formattedStatus = newStatus.toUpperCase();
      
      const response = await fetch(
        `http://localhost:3000/themes/${themeId}/skills/${skillIndex}/${formattedStatus}`,
        { method: "PUT" }
      );
      
      if (!response.ok) throw new Error("Erreur serveur"); 
      // Si la requête HTTP échoue on lance une erreur qui sera attrapée par le catch pour afficher le message d'erreur dans la console.

      const data = await response.json();     
      console.log("Réponse du serveur:", data); // vérifie si pris en compte

      // Mise à jour du state local pour re-render
      setSkillsList((prevSkills) =>
        prevSkills.map((skill, index) =>
          // Si l'index de la skill correspond à celui qu'on veut modifier,
          // on retourne une copie de la skill avec le nouveau statut,
          // sinon on retourne la skill inchangée.
          index === skillIndex ? { ...skill, validation: newStatus } : skill 
        )
      );
    } catch (error) {
      console.error("Impossible de mettre à jour le statut :", error);
    }
  };

  return (
    <>
      <ul className="space-y-2">
        {skillsList.map((skill, index) => (
          <li
            // label et validation
            key={`${skill.label}-${index}`}
            className="grid grid-cols-[1fr_auto] items-center gap-4 bg-emerald-50 p-2 rounded-lg"
          >
            {/* Nom du skill */}
            <span className="text-slate-800 font-medium">
              {skill.label}
            </span>

            {/* Select à droite */}
            <select
              value={skill.validation}
              onChange={(e) => updateStatus(index, e.target.value)}
              className={`
                min-w-32
                appearance-none
                border border-emerald-200
                rounded px-3 py-1 text-sm font-semibold
                focus:outline-none focus:ring-2 focus:ring-emerald-300
                ${skill.validation === 'KO' && 'bg-rose-100 text-rose-800'}
                ${skill.validation === 'PROGRESS' && 'bg-amber-100 text-amber-800'}
                ${skill.validation === 'OK' && 'bg-emerald-100 text-emerald-800'}
              `}
            >
              <option value="KO">KO</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="OK">OK</option>
            </select>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Skills
