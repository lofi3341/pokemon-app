import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar';

//Appコンポーネントを定義
function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';  //APIのURLをinitialURLという名前で定義
  const [loading, setLoading] = useState(true);  //ローディング状態を状態変数を定義
  const [pokemonData, setPokemonData] = useState([]); //ポケモンデータの状態変数を定義
  const [nextURL, setNextURL] = useState(""); //次のページのURLを定義
  const [prevURL, setPrevURL] = useState(""); //前のページのURLを定義

  //useEffectフックを定義しコンポーネントがレンダリングされた後に実行。第二引数"[]"は空の配列を意味し１度だけ実行するよう定義
  useEffect(() => {
    //fetchPokemonDate関数をasyncで非同期として定義。ポケモンのデータを取得するために非同期に getAllPokemon 関数を呼び出し、取得したデータをコンソールに出力
    const fetchPokemonDate = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //取得したデータをコンソールに出力
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
      };
      //fetchPokemonDate関数を実行
      fetchPokemonDate();
  }, []);

  //loadPokemonを定義。pokemonDataに20種類のポケモンのデータを格納する。
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all( //_pokemonDataを定義し、20種類のポケモンのfechが全て終わるまで待つ
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url); //_pokemonRecordを定義、pokemon.urlを引数に取ってgetAllPokemon関数を実行
        return pokemonRecord; //json形式でポケモンの個別データが返ってくる
      })
    );
    setPokemonData(_pokemonData);//これでpokemonDataに20件分の個別のポケモンデータが格納される
  };

  //handlePrevpageを定義
  const handlePrevpage = async () => {
    if (!prevURL) return; //prevURLがない場合は処理を終了
    setLoading(true);
    let data = await getAllPokemon(prevURL);//dateを定義、getAllPokemon関数でprevURLを引数に取る
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  //handleNextpageを定義
  const handleNextpage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  //returnでローディング状態に応じて表示する内容を切り替え
  return (
    <>
      <Navbar />
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
            <div className="btn">
              <button onClick={handlePrevpage}>前へ</button>
              <button onClick={handleNextpage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

//Appを実行
export default App;
