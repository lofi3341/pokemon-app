import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card.js';

//Appコンポーネントを定義
function App() {
  //APIのURLをinitialURLという名前で定義
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);  //ローディング状態を定義
  const [pokemonData, setPokemonData] = useState([]); //ポケモンデータを定義
  //useEffectフックを定義しコンポーネントがレンダリングされた後に実行。第二引数"[]"は空の配列を意味し１度だけ実行するよう定義
  useEffect(() => {
    //fetchPokemonDateという関数をasyncで非同期として定義。ポケモンのデータを取得するために非同期に getAllPokemon 関数を呼び出し、取得したデータをコンソールに出力
    const fetchPokemonDate = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //取得したデータをコンソールに出力
      //console.log(res);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
  };
  //fetchPokemonDate関数を実行
  fetchPokemonDate();
}, []);

const loadPokemon = async (data) => {
  let _pokemonData = await Promise.all(
    data.map((pokemon) => {
      //console.log(pokemon);
      let pokemonRecord = getPokemon(pokemon.url); //pokemon.urlを引数に取ってgetAllPokemon関数を実行
      return pokemonRecord;
    })
  );
  setPokemonData(_pokemonData);
};

console.log(pokemonData);

//returnでローディング状態に応じて表示する内容を切り替え
return (
  <div className="App">
    {loading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <div className="grid-container">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      </>
    )}
    </div>
  );
}

//Appコンポーネントを実行
export default App;
