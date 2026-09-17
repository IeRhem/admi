import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <section>
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">Welcome to ADMI</h1>
          <p className="mt-2 text-gray-600">
            This is the home page of the ADMI application.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
