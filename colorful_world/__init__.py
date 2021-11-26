from random import randrange, sample

from flask import Flask, render_template

def create_app():
    # create and configure the app
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    @app.route('/')
    def main():
        return render_template('main.html')

    @app.route('/play_game', methods=["GET"])
    def play_game():
        """Generate game components and response to game play page."""

        objective, left, right = create_game_val()

        return render_template('play_game.html', objective=objective, left=left, right=right)

    return app

def create_game_val():
     # Generate objective rgb values. This will be goal for this game.
    objective_cnt = 3
    objective = [[randrange(0x100) for _ in range(3)] for _ in range(objective_cnt)]

    # Create two empty nested lists. This will be selections player can control.
    left = [[] for _ in objective]
    right = [[] for _ in objective]
    
    # Access to rgb values of each objective.
    for i in range(objective_cnt):
        for objective_rgb in objective[i]:
            # Calculate maximum range of variance. Every rgb value must be in [0, 255].
            max_gap = objective_rgb if objective_rgb < 128 else 255 - objective_rgb

            # Randomize variable in range
            if (max_gap > 0):
                max_gap = randrange(max_gap + 1)

            # Set rgb values to lists.
            left_rgb, right_rgb = sample((objective_rgb + max_gap, objective_rgb - max_gap), k=2)
            left[i].append(left_rgb)
            right[i].append(right_rgb)

    # Validation check.
    # chk_list = [objective[i][j] * 2 == (left[i][j] + right[i][j]) for i in range(len(objective)) for j in range(len(objective[i]))]
    # print(chk_list)

    # Shuffle lists. * Shuffle method is deprecated so will not be able to use in future.
    left = sample(left, k=len(left))
    right = sample(right, k=len(right))

    # Transform rgb values to hex values
    objective = rgb_list_to_hex_list(objective)
    left = rgb_list_to_hex_list(left)
    right = rgb_list_to_hex_list(right)

    return objective, left, right

def rgb_list_to_hex_list(rgb_list):
    hex_list = []

    for rgb in rgb_list:
        hex = 0
        for i in range(3):
            hex += rgb[i] * (16 ** (4 - (i * 2)))
        hex_list.append(hex)

    return hex_list