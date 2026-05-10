import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

type PageLoadingProps = {
  label?: string;
};

export function PageLoading({ label = "Loading…" }: PageLoadingProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-gray-300">
      <ProgressSpinner
        style={{ width: "48px", height: "48px" }}
        strokeWidth="4"
        aria-label={label}
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}

type PageEmptyProps = {
  title: string;
  detail?: string;
};

export function PageEmpty({ title, detail }: PageEmptyProps) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center p-8">
      <Message
        severity="info"
        className="w-full max-w-md !bg-gray-800/80 !border-gray-600 !justify-evenly"
        text={
          <span>
            <strong className="text-yellow-200">{title}</strong>
            {detail ? (
              <span className="mt-1 block text-sm text-gray-300">{detail}</span>
            ) : null}
          </span>
        }
      />
    </div>
  );
}

type InlineErrorProps = {
  message?: string;
};

export function PageError({ message = "Something went wrong. Try again later." }: InlineErrorProps) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center p-8">
      <Message severity="error" className="w-full max-w-md" text={message} />
    </div>
  );
}
