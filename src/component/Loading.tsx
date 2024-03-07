import CircleLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircleLoader
          color="black"
          height={15}
          width={5}
          radius={5}
          margin={5}
        />
      </div>
    </div>
  );
};

export default Loading;