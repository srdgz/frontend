import React from "react";
import App from "../App";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve(
        Array.from({ length: 20 }, (_, index) => ({
          albumId: 1,
          id: index + 1,
          title: `test image ${index + 1}`,
          url: `https://via.placeholder.com/600/92c952?${index + 1}`,
          thumbnailUrl: `https://via.placeholder.com/150/92c952?${index + 1}`,
        }))
      ),
  })
);

describe("App Component", () => {
  test("renders a card with the image title", async () => {
    render(<App />);

    const imageTitle = await screen.findByTestId("image-item-1");
    expect(imageTitle).toBeInTheDocument();
  });

  test("loads more images when scrolling to the bottom", async () => {
    render(<App />);

    const firstImageItem = await screen.findByTestId("image-item-1");
    expect(firstImageItem).toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      const newImageItem = screen.queryByTestId("image-item-20");
      expect(newImageItem).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 0 } });
  });

  test("removes an image card when the delete button is clicked", async () => {
    render(<App />);

    const imageTitle = await screen.findByTestId("image-item-1");
    expect(imageTitle).toBeInTheDocument();

    const deleteButton = await screen.findByTestId("removeButton-2");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByTestId("image-item-2")).not.toBeInTheDocument();
    });
  });
});
