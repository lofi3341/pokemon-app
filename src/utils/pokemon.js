//urlを引数に取ってgetAllPokemon関数をエクスポート
export const getAllPokemon = (url) => { 
    //データの非同期処理を行う
    return new Promise((resolve, reject) => {
        //urlをfetchで取得
        fetch(url)
            //resを取得したらjsonに変換
            .then((res) => res.json())
            //dataを取得したらdataをPromiseを介して返す
            .then((data) => resolve(data));
    });
};

export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                resolve(data)});
    });
}