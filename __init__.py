import os
from random import randrange

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

    @app.route('/play', methods=["GET"])
    def play():
        target_val_list = [[randrange(0x100) for _ in range(3)] for _ in range(3)]
        # target_val_list = [[0, 0, 0], [1, 1, 1], [127, 127, 127], [128, 128, 128], [254, 254, 254], [255, 255, 255]] # for check

        print("target")
        print(target_val_list)

        left_val_list = [[] for _ in target_val_list]
        right_val_list = [[] for _ in target_val_list]
        # max_gap_list = [[] for _ in target_val_list] # for check
        for i in range(len(target_val_list)):
            for target_rgb in target_val_list[i]:
                max_gap = target_rgb if target_rgb < 128 else 255 - target_rgb
                # max_gap_list[i].append(max_gap) # for check

                if (max_gap != 0):
                    max_gap = randrange(max_gap + 1)

                left_val_list_rgb = target_rgb - max_gap
                right_val_list_rgb = target_rgb * 2 - left_val_list_rgb
                left_val_list[i].append(left_val_list_rgb)
                right_val_list[i].append(right_val_list_rgb)

        # for check
        # print("max_gap")
        # print(max_gap_list)

        print("left")
        print(left_val_list)
        print("right")
        print(right_val_list)

        # for check
        # chk_list = [target_val_list[i][j] * 2 == (left_val_list[i][j] + right_val_list[i][j]) for i in range(len(target_val_list)) for j in range(len(target_val_list[i]))]
        # print("check")
        # print(chk_list)

        return render_template('play.html', target=target_val_list, left=left_val_list, right=right_val_list)

    return app