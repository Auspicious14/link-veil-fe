from playwright.sync_api import sync_playwright, Page, expect

def verify_landing_page(page: Page):
    """
    This function verifies that the landing page loads correctly.
    """
    # 1. Arrange: Go to the application's homepage.
    page.goto("http://localhost:3000")

    # 2. Assert: Check for the main headline to ensure the page has loaded.
    expect(page.get_by_role("heading", name="Share links privately. Approve who sees them.")).to_be_visible()

    # 3. Assert: Check that the "How It Works" section is present.
    expect(page.get_by_role("heading", name="How It Works")).to_be_visible()

    # 4. Screenshot: Capture the full landing page for visual verification.
    page.screenshot(path="jules-scratch/verification/landing_page.png", full_page=True)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_landing_page(page)
        browser.close()

if __name__ == "__main__":
    main()