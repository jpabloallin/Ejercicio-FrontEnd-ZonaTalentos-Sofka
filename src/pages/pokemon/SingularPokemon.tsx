import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiUrl from "../../features/global/apiUrl";
import emojiPokemonType from '../../assets/types';
import { Card, ListGroup } from "react-bootstrap";
import { FaChevronLeft } from 'react-icons/fa';

export interface IPokemonTypeProps {
    name: string;
    emoji: React.SVGProps<SVGSVGElement>;
}

export interface IPokemonProps {
    id: string;
    image: string;
    specie: string;
    height: string;
    weight: string;
    type: IPokemonTypeProps[];
}

const SingularPokemon: React.FC = () => {

    const { name } = useParams();

    const [pokemon, setPokemon] = useState({} as IPokemonProps);

    useEffect(() => {
        apiUrl.get(`/pokemon/${name}`)
        .then(res => {
            const {
                id,
                sprites,
                species,
                height,
                weight,
                types,                
            } = res.data;

            setPokemon({
                id,
                image: sprites.other['official-artwork'].front_default,
                specie: species.name,
                height: `${height} cm`,
                weight: `${weight/10} kg`,
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
    <div className="d-flex justify-content-center my-2">
        <Card border="dark" style={{ width: '15rem' }}>
            <Card.Body>
                <Card.Header><h4>{name?.toUpperCase()}</h4> </Card.Header>
                {pokemon.image && (
                <   Card.Img variant="top" src={pokemon.image} alt={`Image of pokémon ${name}`}/>
                )}
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
                <ListGroup >
                    <ListGroup.Item action variant="light">
                        <strong>Species:</strong> <span>{pokemon.specie}</span>  
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        <strong>Height:</strong> <span>{pokemon.height}</span>  
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        <strong>Weight:</strong> <span>{pokemon.weight}</span>  
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Link href="/"><FaChevronLeft size={30} /></Card.Link>
            </Card.Body>
        </Card>
    </div>
    </>
}

export default SingularPokemon