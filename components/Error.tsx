export interface ErrorProps {
  code: number;
  title: string;
}

const Error = ({ code, title }: ErrorProps) => {
  return (
    <div className="w-full h-[100vh] bg-black flex flex-col gap-2 items-center justify-center overflow-hidden">
      <h1 className="text-3xl text-white">
        {code} - {title}
      </h1>
      <p className="text-white">
        Go back{" "}
        <a
          href="/"
          className="text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          home
        </a>
        .
      </p>
    </div>
  );
};

export default Error;
