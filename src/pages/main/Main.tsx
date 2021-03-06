import * as React from "react"
import apiUrl from "../../features/global/apiUrl"
import {POKEMON_BY_PAGE} from "../../features/global/pokemonNumber"
import {NUMBER_MAX_POKEMONS} from "../../features/global/pokemonNumber"
import Card from 'react-bootstrap/Card';
import PokemonInformation from "../../components/pokemon/PokemonInformation";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IPokemonProps {
    id: string;
    name: string;
}

const Main : React.FC = () => {
    
    const{user} = useSelector((state:RootState) => state.logged)
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === null) {
          navigate("/login");
        }
      }, []);

    const [ pokemon, setPokemon ] = React.useState<IPokemonProps[]>([])
    const [pokemonSearch, setPokemonSearch] = React.useState('');

    //Search pokémon with a limitation of 600 
    const handleSearchPokemon = React.useCallback(async () => {
        const response = await apiUrl.get(`/pokemon?limit=${NUMBER_MAX_POKEMONS}`);
    
        setPokemonSearch(pokemonSearch.toLocaleLowerCase());
        const pokemonsSearch = response.data.results.filter(
          ({ name }: IPokemonProps) => name.includes(pokemonSearch),
        );
        setPokemon(pokemonsSearch);
      }, [pokemonSearch]);

      //Displays 50 pokémon by default
    const pokemonList = React.useCallback(async () => {
        const res = await apiUrl.get('/pokemon', {
            params: {
                limit: POKEMON_BY_PAGE,
            },
        });
        setPokemon(res.data.results);
    },[]);

    //Starts searching when you write 2 letters or more in the input section
    React.useEffect(() => {
        const isSearch = pokemonSearch.length >= 2;

        if (isSearch) handleSearchPokemon();
        else pokemonList();

    }, [pokemonSearch, pokemonList, handleSearchPokemon])

    return <>
        <Container>
        <br />
            <Container>
                <FaSearch className="mx-2"/>
                <input
                placeholder={'Search Pokémon'}
                value={pokemonSearch}
                onChange={e => setPokemonSearch(e.target.value)}
                />
            </Container>
            <br />
                <Row xm={1} md={5} className="g-4">
                    {pokemon.map((pokemon) => (
                        <Col key={pokemon.name}>
                            <Card border="dark" style={{ width: '13rem' }}>
                                <PokemonInformation name={pokemon.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br />
        </Container>
    </>
}

export default Main