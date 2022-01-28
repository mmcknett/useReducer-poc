import { useState, useReducer } from "react";

const initialSpellList = {
  spells: [
    {
      id: 0,
      name: "burning hands",
      owned: false
    },
    {
      id: 1,
      name: "magic missile",
      owned: false
    }
  ]
};

const reducerFn = (state, action) => {
  switch(action.type) {
    case 'sell':
      return {
        spells: state.spells.map(spell => {
          if (spell.id === action.id) {
            return {
              ...spell,
              owned: false
            };
          }

          return spell;
        })
      };
    case 'buy':
      return {
        spells: state.spells.map(spell => {
          if (spell.id === action.id) {
            return {
              ...spell,
              owned: true
            };
          }

          return spell;
        })
      };
    case 'add':
      return {
        spells: [
          ...state.spells,
          {
            id: state.spells.length,
            name: action.name,
            owned: false
          }
        ]
      };
    default:
      return state;
  }
}

export default function ReducerUser() {
  const [state, dispatch] = useReducer(reducerFn, initialSpellList);
  const [newSpellName, setNewSpellName] = useState("");

  const sell = id => dispatch({type: 'sell', id});
  const buy = id => dispatch({type: 'buy', id});
  const addSpell = name => dispatch({type: 'add', name});

  return (
    <div className="spell-list">
      Spells (updates using a reducer):
      <ul>
        { 
          state.spells.map(spell => (
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