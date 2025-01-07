console.log("script running");

function isNumber(value) 
{
    return Number.isFinite(value);
}

function f(x)
{
    return ((100/x) + ((2 * x) / 3 ) -20);
}

function scaleX(x,width,scale)
{
    let center = width / 2;

    x = x * scale;
    x = center + x;

    return x;
}

function scaleY(y,height,scale)
{
    let center = height / 2;

    y = y * scale;
    y = center - y;

    return y;
}

function draw(elementId,table)
{
    const svg = document.getElementById(elementId);
    svg.innerHTML = '';

    let svgWidth  = svg.getBoundingClientRect().width;
    let svgHeight = svg.getBoundingClientRect().height;

    const horizontalAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const verticalAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    horizontalAxis.setAttribute('x1', svgWidth / 2);  // Starting x-coordinate
    horizontalAxis.setAttribute('y1', '0');  // Starting y-coordinate
    horizontalAxis.setAttribute('x2', svgWidth / 2); // Ending x-coordinate
    horizontalAxis.setAttribute('y2', svgHeight); // Ending y-coordinate
    horizontalAxis.setAttribute('stroke', 'grey'); // Line color
    horizontalAxis.setAttribute('stroke-width', '0.5'); // Line thickness
    svg.appendChild(horizontalAxis);

    verticalAxis.setAttribute('x1', '0');  // Starting x-coordinate
    verticalAxis.setAttribute('y1', svgHeight / 2);  // Starting y-coordinate
    verticalAxis.setAttribute('x2', svgWidth); // Ending x-coordinate
    verticalAxis.setAttribute('y2', svgHeight / 2); // Ending y-coordinate
    verticalAxis.setAttribute('stroke', 'grey'); // Line color
    verticalAxis.setAttribute('stroke-width', '0.5'); // Line thickness
    svg.appendChild(verticalAxis);

    svg.addEventListener('mousemove', (e) => 
        {
            const target = e.target;
            const tooltipText = target.getAttribute('data-tooltip');
      
            if (tooltipText) {
              // Show tooltip
              tooltip.textContent   = tooltipText;
              tooltip.style.display = 'block';
      
              // Position tooltip
              tooltip.style.left = e.pageX + 10 + 'px'; // 10px offset from the mouse pointer
              tooltip.style.top = e.pageY + 10 + 'px';
            } else {
              // Hide tooltip
              tooltip.style.display = 'none';
            }
          });

    for(let i = 0; i < table.length; i++)
    {
        x = table[i][0];
        y = table[i][1];

        sx = scaleX(x,svgWidth,4);
        sy = scaleY(y,svgHeight,4);

        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", sx); // X-coordinate of the center
        dot.setAttribute("cy", sy); // Y-coordinate of the center
        dot.setAttribute("r", 2);    // Radius of the dot (small value to make it a dot)
        dot.setAttribute("stroke", "black"); // Color of the dot
        dot.setAttribute("fill", "red"); // Color of the dot
        dot.setAttribute('data-tooltip', '[ ' + x + ' , ' + y.toFixed(2) + ' ]');
        dot.setAttribute("class", "dot"); 
        
        // Add the dot to the SVG container
        svg.appendChild(dot);
    }
}

function compute()
{
    let startValue = document.getElementById('startValue').value;
    let endValue   = document.getElementById('endValue').value;

    let table = [];
    let index = 0;

    for(let i = startValue ; i <= endValue; i++)
    {
        let x = i;
        let y = f(x);

        if(isNumber(x) && isNumber(y))
        {
            table[index] =  [x,y]; 
            index++;
        }
    }

    draw('mySvg',table);
}


