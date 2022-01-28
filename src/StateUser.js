import { useState } from "react";

const initialSpellList = [
  {
    id: 0,
    name: "burning hands 2",
    owned: false
  },
  {
    id: 1,
    name: "magic missile 2",
    owned: false
  }
];

export default function StateUser() {
  const [spells, setSpells] = useState(initialSpellList);
  const [newSpellName, setNewSpellName] = useState("");

  const sell = id => {
    setSpells(spells.map(spell => {
      if (spell.id === id) {
        return {
          ...spell,
          owned: false
        };
      }

      return spell;
    }));
  };

  const buy = id => {
    setSpells(spells.map(spell => {
      if (spell.id === id) {
        return {
          ...spell,
          owned: true
        };
      }

      return spell;
    }));
  };

  const addSpell = name => {
    setSpells([
      ...spells,
      {
        id: spells.length,
        name,
        owned: false
      }
    ]);
  };

  return (
    <div className="spell-list">
      Spells (updates using state):
      <ul>
        {
          spells.map(spell => (
            <li key={ spell.id }>
              { spell.name }
              {
                spell.owned ?
                  <button onClick={() => sell(spell.id)}>Sell</button> :
                  <button onClick={() => buy(spell.id)}>Buy</button>
              }
            </li>
          ))
        }
        <li>
          <form
            onSubmit={ e => {
              e.preventDefault();
              addSpell(newSpellName); } }
          >
            <input
              type="text"
              name="newspell"
              value={ newSpellName }
              onChange={ e => setNewSpellName(e.target.value) }
            />
            <input type="submit" value="Add" />
          </form>
        </li>
      </ul>
    </div>
  );
}