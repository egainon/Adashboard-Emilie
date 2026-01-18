import { useState } from 'react'
import Skills from "./Skills"

function Themes({ themes, onThemeDeleted, onThemeAdded }) {

  const [status, setStatus] = useState("");
  const [value, setValue] = useState('');
  const [skillsList, setSkillsList] = useState([]); // tableau de skills {label, validation}
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DELETE
  const deleteTheme = async (id) => {
    try {
      await fetch(`http://localhost:3000/themes/${id}`, {
        method: "DELETE",
      });
      setStatus("Suppression réussie");
      onThemeDeleted(id);
    } catch (error) {
      setStatus("Échec de la suppression");
      console.error(error);
    }
  };

  // POST
  const addTheme = async () => {
    if (!value.trim()) return;
    const skillsArray = skillsList
      .filter(s => s.label.trim()) // garde seulement les skills non vides
      .map(s => ({
        label: s.label.trim(),
        validation: s.validation
      }));

    try {
      const response = await fetch("http://localhost:3000/themes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //transformation un objet JavaScript en chaîne JSON afin de l’envoyer correctement dans le corps (body) d’une requête HTTP
        body: JSON.stringify({
          name: value,
          skills: skillsArray,
        }),
      });

      // Vérifie que la réponse contient du JSON
      let newTheme = null;
      const text = await response.text(); // récupère la réponse brute
      if (text) {
        newTheme = JSON.parse(text); // parse seulement si ce n'est pas vide
        console.log("Thème ajouté :", newTheme);
      } else {
        console.log("Thème ajouté (backend ne renvoie rien)");
      }

      //reinitialisations du formulaire après ajout(vide champs et fermeture du modal en mettant isModalOpen à false) : reset
      setValue("");
      setSkillsList([]);
      setIsModalOpen(false);

      if (onThemeAdded) {
        onThemeAdded(newTheme);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-emerald-50 text-slate-800 p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* statut suppression */}
          {status && <p className="text-sm text-slate-600">{status}</p>}

          {/* bouton ouverture modale */}
          <button 
            className="bg-emerald-200 hover:bg-emerald-300 transition text-emerald-900 font-semibold py-2 px-4 rounded-lg shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter un thème
          </button>

          {/* MODALe */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-emerald-50 rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">

                <h3 className="text-xl font-bold text-emerald-600">
                  Nouveau thème
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTheme();
                  }}
                >
                  <div>
                    <label className="block text-sm text-slate-700">Nom</label>
                    <input
                      className="
                        w-full bg-white border border-emerald-200
                        rounded-md px-3 py-2 text-slate-800
                        placeholder-slate-400
                        focus:outline-none focus:ring-2 focus:ring-emerald-300
                      "
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Nom du thème"
                      required
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <label className="block text-sm text-slate-700">Skills</label> 

                    {/* Liste des champs de skills */}
                    {skillsList.map((skill, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_auto_auto] items-center gap-2 bg-emerald-50 p-2 rounded-lg"
                      >
                        <input
                          className="
                            bg-white border border-emerald-200
                            rounded px-2 py-1 text-slate-800
                            focus:outline-none focus:ring-2 focus:ring-emerald-300
                          "
                          type="text"
                          value={skill.label}
                          onChange={(e) => {
                            const newList = [...skillsList];
                            newList[index].label = e.target.value;
                            setSkillsList(newList);
                          }}
                          placeholder="Nom du skill"
                        />

                        <select
                          value={skill.validation}
                          onChange={(e) => {
                            const newList = [...skillsList];
                            newList[index].validation = e.target.value; // modifie la propriété validation de l'élément à la position index avec la nouvelle valeur sélectionnée
                            setSkillsList(newList);
                          }}
                          className={`
                            min-w-32 appearance-none border rounded px-3 py-1 text-sm font-semibold
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

                        <button 
                          className="text-rose-400 hover:text-rose-500 font-semibold transition"
                          type="button"
                          onClick={() => {
                            setSkillsList(
                              skillsList.filter((skill, i) => i !== index) //MAJ liste des skills en supprimant celui dont l’index correspond à index, en gardant tous les autres.
                            );
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Bouton pour ajouter un nouveau champ */}
                    <button 
                      className="mt-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold py-2 px-4 rounded-lg transition"
                      type="button"
                      onClick={() => {
                        setSkillsList([...skillsList, { label: '', validation: 'KO' }]);
                      }}
                    >
                      Ajouter un skill
                    </button>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="submit"
                      className="bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Ajouter
                    </button>
                    <button 
                      className="bg-emerald-50 hover:bg-emerald-100 text-slate-700 px-4 py-2 rounded-lg transition"
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* LISTE DES THEMES */}
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="bg-emerald-100 rounded-xl p-4 shadow space-y-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-emerald-600">
                  {theme.name}
                </h2>

                <button 
                  className="text-rose-400 hover:text-rose-500 font-semibold transition"
                  onClick={() => deleteTheme(theme.id)}
                >
                  Supprimer
                </button>
              </div>

              <Skills
                skills={theme.skills}
                themeId={theme.id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Themes
