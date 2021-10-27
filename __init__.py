import os
from random import randrange, sample

from flask import Flask, render_template

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def main():
        return render_template('main.html')

    @app.route('/play_game', methods=["GET"])
    def play_game():
        """Generate game components and response to game play page."""

        # Generate target rgb values. This will be object for this game.
        target_cnt = 3
        target = [[randrange(0x100) for _ in range(3)] for _ in range(target_cnt)]

        # Create two empty nested lists. This will be selections player can control, contains right answers and dummy options.
        left = [[] for _ in target]
        right = [[] for _ in target]
       
        # Access to each target rgb values.
        for i in range(target_cnt):
            for target_rgb in target[i]:
                # Calculate maximum range of variance. Each rgb value must be in [0, 255].
                max_gap = target_rgb if target_rgb < 128 else 255 - target_rgb
                if (max_gap > 0):
                    max_gap = randrange(max_gap + 1)

                # Set rgb values to each lists.
                left_rgb, right_rgb = sample((target_rgb + max_gap, target_rgb - max_gap), k=2)
                left[i].append(left_rgb)
                right[i].append(right_rgb)

        # Validation check.
        # chk_list = [target[i][j] * 2 == (left[i][j] + right[i][j]) for i in range(len(target)) for j in range(len(target[i]))]
        # print(chk_list)

        # Add more dummy selections.
        for i in range(target_cnt):
            left.append([randrange(0x100) for _ in range(3)])
            right.append([randrange(0x100) for _ in range(3)])

        # Shuffle lists.
        left = sample(left, k=len(left))
        right = sample(right, k=len(right))

        return render_template('play_game.html', target=target, left=left, right=right)

    return app