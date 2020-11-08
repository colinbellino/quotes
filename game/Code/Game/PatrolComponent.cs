using UnityEngine;

public class PatrolComponent : MonoBehaviour
{
    [SerializeField] private int _speed = 3;
    [SerializeField] private Vector3[] _points;

    private int _currentPointIndex;

    private void Start()
    {
	    if (_points == null || _points.Length == 0)
	    {
		    _points = new Vector3[2];
		    _points[0] = transform.position + new Vector3(0f, 0f, -5f);
		    _points[1] = transform.position + new Vector3(0f, 0f, +5f);
	    }
    }

    private void Update()
    {
	    transform.position = Vector3.MoveTowards(transform.position, _points[_currentPointIndex], Time.deltaTime * _speed);

	    if (Vector3.Distance(transform.position, _points[_currentPointIndex]) <= 0.1f)
	    {
		    _currentPointIndex = (_currentPointIndex + 1) % _points.Length;
	    }
    }
}
