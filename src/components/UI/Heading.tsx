type HeadingProps = {
  isTitle?: boolean;
  title?: string;
  subTitle?: string;
};

function Heading({ isTitle, title, subTitle }: HeadingProps) {
  return (
    <>
      {isTitle ? (
        <h1 className="font-bold  text-white text-3xl max-lg:text-2xl text-center">
          {title}
        </h1>
      ) : (
        <p className="font-medium text-white text-lg max-lg:text-sm opacity-50 text-center">
          {subTitle}
        </p>
      )}
    </>
  );
}

export default Heading;
