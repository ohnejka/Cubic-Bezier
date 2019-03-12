import Button from "./Button.js";

export default class Canvas {
  constructor({ element }) {
    this._el = element;
    this._content = element.getContext("2d");

    this._clickHandler();
    this._initButton();
  }

  _initButton() {
    this._button = new Button({
      element: document.querySelector(".restart-button")
    });

    this._button.on("clearCanvas", () => {
      this.clearCanvas();
      this._points = [];
      this._count = 0;
    });
  }

  _clickHandler() {
    this._points = [];
    this._count = 0;
    let rect = this._el.getBoundingClientRect();

    this._el.addEventListener("click", e => {
      if (this._count < 4) {
        let point = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };

        this._points.push(point);

        if (this._count === 0) {
          this._drawMainPoint(this._points[this._count]);
        }

        if (this._count === 1) {
          this._drawMainPoint(this._points[this._count]);
          this._drawLine(this._points);
        }

        if (this._count === 2) {
          this._drawControlPoint(this._points[this._count]);
        }

        if (this._count === 3) {
          this._drawControlPoint(this._points[this._count]);
          this._drawBezierCurve(this._points);
        }

        this._count++;
      }
    });
  }

  _drawMainPoint(item) {
    this._content.fillStyle = "rgb(71, 96, 64)";

    this._content.save();
    this._content.beginPath();
    this._content.arc(item.x, item.y, 10, 0, 2 * Math.PI, false);
    this._content.fill();
    this._content.restore();
  }

  _drawControlPoint(item) {
    this._content.fillStyle = "rgb(237, 135, 51)";

    this._content.save();
    this._content.beginPath();
    this._content.arc(item.x, item.y, 5, 0, 2 * Math.PI, false);
    this._content.fill();
    this._content.restore();
  }

  _drawLine(arr) {
    this._content.strokeStyle = "rgb(71, 96, 64)";
    this._content.lineWidth = 1;
    this._content.lineCap = "round";

    this._content.beginPath();
    this._content.moveTo(arr[0].x, arr[0].y);
    this._content.lineTo(arr[1].x, arr[1].y);
    this._content.stroke();
  }

  _drawBezierCurve(arr) {
    let startPoint = arr[0];
    let endPoint = arr[1];

    let controlPointOne = arr[2];
    let controlPointTwo = arr[3];

    this._content.strokeStyle = "rgb(71, 96, 64)";
    this._content.lineWidth = 7;

    this._content.beginPath();
    this._content.moveTo(startPoint.x, startPoint.y);
    this._content.bezierCurveTo(
      controlPointOne.x,
      controlPointOne.y,
      controlPointTwo.x,
      controlPointTwo.y,
      endPoint.x,
      endPoint.y
    );
    this._content.stroke();
  }

  clearCanvas() {
    this._content.clearRect(0, 0, this._el.width, this._el.height);
  }
}
