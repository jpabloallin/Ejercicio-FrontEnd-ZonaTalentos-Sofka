import * as React from "react"
import apiUrl from "../../features/global/apiUrl";
import emojiPokemonType from '../../assets/types';
import { Card } from "react-bootstrap";

interface IPokemonTypeProps {
    name: string;
    emoji: React.SVGProps<SVGSVGElement>;
}

interface IPokemonProps {
    id: string;
    image: string;
    type: IPokemonTypeProps[];
  }

const PokemonInformation : React.FC<{name: string}> = ({name}) => {

    const [pokemon, setPokemon] = React.useState({} as IPokemonProps);

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
        {pokemon.image && (
        <Card.Img variant="top" src={pokemon.image} alt={`Image of pokémon ${name}`}/>
        )}
        <Card.Body>
            <Card.Title>#{pokemon.id}</Card.Title>
            <Card.Title>{name}</Card.Title>
            {pokemon.type && (
                <Card.Text className="d-flex justify-content-center">
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
                </Card.Text>
            )}
        </Card.Body>
        <Card.Body>
            <Card.Link href="#">Pokemon information</Card.Link>
        </Card.Body>
    </>
}

export default PokemonInformation