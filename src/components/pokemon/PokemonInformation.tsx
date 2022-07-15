import * as React from "react"
import apiUrl from "../../features/global/apiUrl";
import emojiPokemonType from '../../assets/types';
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";

interface IPokemonTypeProps {
    name: string;
    emoji: React.SVGProps<SVGSVGElement>;
}

interface IPokemonProps {
    id: string;
    image: string;
    type: IPokemonTypeProps[];
}

const PokemonInformation : React.FC<{ name: string }> = ({ name }) => {

    const{user} = useSelector((state:RootState) => state.logged)
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === null) {
          navigate("/login");
        }
      }, []);

    const [pokemon, setPokemon] = React.useState({} as IPokemonProps);

    // axios peticion to pokeapi to get each pokemon by its name
    React.useEffect(() => {
        apiUrl.get(`/pokemon/${name}`)
        .then(res => {
            const { id, types, sprites } = res.data;

            setPokemon({
                id,
                image: sprites.other['official-artwork'].front_default,
                type: types.map((pokemonType:any) => {
                    const typeName = pokemonType.type.name as keyof typeof emojiPokemonType;
                    return {
                        name: typeName,
                        emoji: emojiPokemonType[typeName]
                    }
                })
            })
        })
    }, [name])

    return <>
        <Card.Body>
            <Card.Title>#{pokemon.id}</Card.Title>
            {pokemon.image && (
                <Card.Img variant="top" src={pokemon.image} alt={`Image of pokémon ${name}`}/>
            )}
            <Card.Title>{name}</Card.Title>
            {pokemon.type && (
                <div className="d-flex justify-content-center">
                    {
                        pokemon.type.map(pokemonType => 
                            <div key={pokemonType.name} >
                                <>
                                {pokemonType.emoji} 
                                <span className="m-1">{pokemonType.name}</span>
                                </>
                            </div>
                        )
                    }
                </div>
            )}
        </Card.Body>
        <Card.Body>
            <Link to={`pokemon/${name}`} className="link-dark btn btn-danger btn-sm active p-2">Pokémon Data</Link>
        </Card.Body>
    </>
}

export default PokemonInformation