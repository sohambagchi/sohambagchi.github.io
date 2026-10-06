{
  description = "sohambagchi.github.io — Astro static site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.bun          # package manager and runner, in CI too
            pkgs.nodejs_22    # fallback runtime for editor tooling
          ];
          shellHook = ''
            echo "sohambagchi.github.io — bun $(bun --version)"
            echo "  bun install    bun run dev    bun run build"
          '';
        };
      });
}
