export default function Product ({params}: {params: {id: string}}) {
    const { id } = params;
    console.log("Product component", id);
    return <h1>Product: {id}</h1>;
}