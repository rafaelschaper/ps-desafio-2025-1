<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VehicleController extends Controller
{
    protected $vehicle;

    public function __construct(Vehicle $vehicle)
    {
        $this->vehicle = $vehicle;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $vehicles = $this->vehicle->with('category')->get();
        return response()->json($vehicles, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $data = $request->validated();

        $vehicle = $this->vehicle->create($data);

        if ($request->hasFile('image')){
            $path = $request->file('image')->store('vehicles', 'public');
            $vehicle->image = url('storage/'.$path);
            $vehicle->save();
        }

        
        $id = $vehicle->id;
        $vehicle_category = $this->vehicle->with('category')->findOrFail($id);

        return response()->json($vehicle_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $vehicle = $this->vehicle->with('category')->findOrFail($id);
        return response()->json($vehicle, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, $id): JsonResponse
    {
        $vehicle = $this->vehicle->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image') && $vehicle['image']) {
            $image_name = explode('vehicles', $vehicle['image']);
            if (isset($image_name[1])){
                $oldImagePath = 'vehicles/'.$image_name[1];
            }
        }

        $updateSuccess = $vehicle->update(collect($data)->except('image')->toArray());

        if ($updateSuccess && $request->hasFile('image')) {
            $path = $request->file('image')->store('vehicles', 'public');
            $vehicle['image'] = url('storage/'.$path);
            $vehicle->save();

            if ($oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        return response()->json($vehicle, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vehicle = $this->vehicle->findOrFail($id);
        $vehicle->delete();
        return response()->json(['message' => 'Veículo deletado com sucesso!']);
    }

    public function buy($id): JsonResponse
    {
        $vehicle = Vehicle::findOrFail($id);
        
        if ($vehicle->quantity > 0) {
            $vehicle->quantity -= 1;
            $vehicle->save();

            return response()->json(['message' => 'Compra realizada com sucesso!'], Response::HTTP_OK); 
        }

        return response()->json(['message' => 'Veículo esgotado'], Response::HTTP_BAD_REQUEST);
    }
}
