import styled from "styled-components";

type SearchFunctionProps = {
    defaultTitle?:string;
}
const SearchFunction = ({defaultTitle}: SearchFunctionProps) => {
    return(
        <SearchFunctionWrapper>
          <SearchFunctionTitle>
            {defaultTitle}
          </SearchFunctionTitle>
        </SearchFunctionWrapper>
    )
}
export default SearchFunction;

const SearchFunctionWrapper = styled.div`
   display: flex;
   position: relative;
   width: 100%;
   padding: 50px 0px;
   gap: 10px;
   align-items: center;
   justify-content: center;
   text-align: center;
   box-sizing: border-box;
   flex-direction: row;
   
`;

const SearchFunctionTitle = styled.div` 
   display: flex;
   position: relative;
   width: 100px;
   height: 50px;
   border-radius: 12px;
   background-color: #ffffff;
   align-items: center;
   justify-content: center;
   text-align: center;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
   cursor: pointer;
   font-weight: bold;
   font-size: 20px;
   &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`