import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryPage from "../CountryPage";
import * as api from "../../services/api";

jest.mock("../../services/api");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ name: "Germany" }),
}));

const mockCountry = [
  {
    name: { common: "Germany", official: "Federal Republic of Germany" },
    population: 83240525,
    region: "Europe",
    subregion: "Western Europe",
    capital: ["Berlin"],
    tld: [".de"],
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German" },
    flags: { png: "https://flagcdn.com/w320/de.png" },
    borders: ["FRA", "AUT"],
  },
];

describe("CountryPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = () => {
    render(
      <MemoryRouter initialEntries={["/country/Germany"]}>
        <Routes>
          <Route path="/country/:name" element={<CountryPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders loading spinner initially", () => {
    api.getCountryByName.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithRouter();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders country details on successful fetch", async () => {
    api.getCountryByName.mockResolvedValue(mockCountry);
    renderWithRouter();

    expect(
      await screen.findByRole("heading", { name: /germany/i })
    ).toBeInTheDocument();
  });

  test("tries getCountryByCode if name not found", async () => {
    api.getCountryByName.mockResolvedValue([]);
    api.getCountryByCode.mockResolvedValue(mockCountry);

    renderWithRouter();

    expect(
      await screen.findByRole("heading", { name: /germany/i })
    ).toBeInTheDocument();
    expect(api.getCountryByCode).toHaveBeenCalledWith("Germany");
  });

  test("renders error message when country not found", async () => {
    api.getCountryByName.mockResolvedValue([]);
    api.getCountryByCode.mockResolvedValue([]);

    renderWithRouter();

    expect(await screen.findByText(/Country not found/i)).toBeInTheDocument();
  });

  test("renders error message on API failure", async () => {
    api.getCountryByName.mockRejectedValue(new Error("API Error"));

    renderWithRouter();

    expect(
      await screen.findByText(/Failed to load country data/i)
    ).toBeInTheDocument();
  });
});
